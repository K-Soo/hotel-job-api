import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InitiateRecruitmentPaymentDto } from './dto/initiate-recruitment-payment.dto';
import { Payment } from '../entities/payment.entity';
import { Employer } from '../../employers/entities/employer.entity';
import { PaymentRecruitment, PaymentRecruitmentOptions } from './entities/payment-recruitment.entity';
import { RecruitmentProduct } from '../../products/entities/recruitment.entity';
import { RecruitmentProductOption } from '../../products/entities/recruitment-option.entity';
import { DataSource, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { customHttpException } from '../../../common/constants/custom-http-exception';
import { PaymentStatus } from '../../../common/constants/payment';
import { ResponseStatus } from '../../../common/constants/responseStatus';
import { EmployerCoupon } from '../../coupon/entities/employer-coupon.entity';
import { Recruitment } from '../../employers/recruitment/entities/recruitment.entity';
import { RecruitmentStatus } from '../../../common/constants/recruitment';
import { ConfirmRecruitmentPaymentDto } from './dto/confirm-recruitment-payment.dto';
import { TossService } from '../../../providers/toss/toss.service';
import { PaymentTransaction } from '../entities/payment-transaction.entity';
import { calculatePostingPeriod } from '../../../common/utils/calculatePostingPeriod';
import { POINT_RATE, PointTransactionType } from '../../../common/constants/point';
import { PointTransaction } from '../../point/entities/point-transaction.entity';
import { addYears } from 'date-fns';
import { Membership } from '../../membership/entities/membership.entity';
@Injectable()
export class PaymentRecruitmentService {
  private readonly logger = new Logger(PaymentRecruitmentService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly tossService: TossService,
  ) {}

  // 채용 상품 결제 생성
  initiateRecruitmentPayment(dto: InitiateRecruitmentPaymentDto, userId: string) {
    return this.dataSource.transaction(async (manager) => {
      const { recruitmentId } = dto;
      try {
        const employer = await manager.findOne(Employer, { where: { id: userId }, relations: ['membership'] });

        if (!employer) {
          throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_EMPLOYER);
        }

        const recruitment = await manager.findOne(Recruitment, {
          where: { id: recruitmentId, employer: { id: userId } },
        });

        //채용공고 존재 하지않음
        if (!recruitment) {
          throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_RECRUITMENT);
        }

        //대기중인 채용공고가 아님
        if (recruitment.recruitmentStatus !== RecruitmentStatus.PUBLISHED) {
          throw new BadRequestException(customHttpException.PAYMENT_NOT_PUBLISHED_RECRUITMENT);
        }

        const existingPayment = await manager.find(PaymentRecruitment, {
          where: { recruitment },
          relations: ['payment'],
        });
        console.log('@@@@@@@@@@@@@@@: ', existingPayment);

        const completedPayment = await manager.findOne(PaymentRecruitment, {
          where: {
            recruitment,
            payment: { paymentStatus: PaymentStatus.PAYMENT_COMPLETED },
          },
          relations: ['payment'],
        });

        // 이미 결제된 공고
        if (completedPayment) {
          throw new BadRequestException(customHttpException.PAYMENT_INVALID_STATUS);
        }

        // 상품 검증
        const product = await manager.findOne(RecruitmentProduct, {
          where: { id: dto.id },
        });

        if (!product) {
          throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_PRODUCT);
        }

        // 상품 옵션 검증
        for (const option of dto.options) {
          const productOption = await manager.findOne(RecruitmentProductOption, {
            where: { id: option.id },
          });

          if (!productOption) {
            throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_PRODUCT);
          }
        }

        const productPrice = dto.duration.price; // 상품 기본가격
        const productDiscount = Math.floor(productPrice * dto.duration.discountRate); // 상품 할인 적용 가격

        //옵션 기본 가격
        const totalOptionsPrice = dto.options.reduce((sum, option) => sum + option.price, 0);
        // 옵션 할인 적용 가격
        const totalOptionsDiscount = dto.options.reduce((sum, option) => {
          return sum + Math.floor(option.price * option.discountRate);
        }, 0);

        // 총 상품 가격 (상품 + 옵션)
        const originalAmount = productPrice + totalOptionsPrice;
        // 총 할인 가격 (상품 + 옵션 멤버십 할인전)
        const discountAmount = productDiscount + totalOptionsDiscount;

        // 멤버십 할인율
        const membershipDiscountRate = employer.membership?.discountRate ?? 0;

        // 멤버십 할인율 적용된 금액 (원가 - 할인금액) * 멤버십 할인율
        const membershipDiscount = Math.floor((originalAmount - discountAmount) * membershipDiscountRate);

        // 최종 할인 금액 (할인금액 - 멤버십 할인금액)
        const totalDiscountAmount = discountAmount + membershipDiscount;

        // 최종 결제 금액 (멤버십 할인 포함)
        const finalTotalAmount = originalAmount - totalDiscountAmount;
        console.log('originalAmount: ', originalAmount);
        console.log('totalDiscountAmount: ', totalDiscountAmount);

        // Payment 데이터 생성
        const payment = manager.create(Payment, {
          userId,
          originalAmount,
          discountAmount,
          totalAmount: finalTotalAmount, // 초기 결제 금액
          paymentStatus: PaymentStatus.PAYMENT_PENDING,
        });

        await manager.save(payment);

        const paymentRecruitment = manager.create(PaymentRecruitment, {
          payment,
          recruitment,
          name: dto.name,
          type: dto.type,
          duration: dto.duration.duration,
          bonusDays: dto.duration.bonusDays,
          price: dto.duration.price,
          discountRate: dto.duration.discountRate,
        });

        await manager.save(paymentRecruitment);

        for (const option of dto.options) {
          const paymentOption = manager.create(PaymentRecruitmentOptions, {
            paymentRecruitment,
            name: option.name,
            duration: option.duration,
            bonusDays: option.bonusDays,
            price: option.price,
            discountRate: option.discountRate,
            maxListUpPerDay: option.maxListUpPerDay,
            listUpIntervalHours: option.listUpIntervalHours,
            tags: option.tags,
          });

          await manager.save(paymentOption);
        }

        return { status: ResponseStatus.SUCCESS, orderId: payment.orderId };
      } catch (error) {
        this.logger.error(`PAYMENT ERROR: ${error.message}`);
        throw error;
      }
    });
  }

  // 주문 상세정보
  async getOrderDetails(orderId: string, userId: string) {
    return this.dataSource.transaction(async (manager) => {
      try {
        const payment = await manager.findOne(Payment, {
          where: { orderId, userId },
          relations: ['recruitmentPayments', 'recruitmentPayments.recruitment', 'recruitmentPayments.options'],
        });

        //주문번호 검증
        if (!payment) {
          throw new NotFoundException(customHttpException.PAYMENT_NOT_FOUND_ORDER);
        }

        // 결제 상태 확인 (PAYMENT_PENDING이 아니면 예외 처리)
        if (payment.expiresAt < new Date()) {
          await manager.remove(payment);
          await manager.query(`COMMIT`);
          throw new BadRequestException(customHttpException.PAYMENT_EXPIRED_ORDER);
        }

        if (payment.paymentStatus === PaymentStatus.PAYMENT_COMPLETED) {
          throw new BadRequestException(customHttpException.PAYMENT_COMPLETED_STATUS);
        }

        if (payment.paymentStatus !== PaymentStatus.PAYMENT_PENDING) {
          throw new BadRequestException(customHttpException.PAYMENT_INVALID_STATUS);
        }

        // 주문 금액이 0원 이하인지 확인 (데이터 무결성 검증)
        if (payment.totalAmount <= 0) {
          throw new InternalServerErrorException(customHttpException.PAYMENT_INVALID_TOTAL_AMOUNT);
        }

        // 주문에 포함된 상품이 정상인지 확인
        if (!payment.recruitmentPayments || payment.recruitmentPayments.length === 0) {
          throw new InternalServerErrorException(customHttpException.PAYMENT_EMPTY_ORDER_ITEMS);
        }

        const employer = await manager.findOne(Employer, {
          where: { id: userId },
          relations: ['membership', 'certification', 'company'],
        });

        if (!employer.certification) {
          throw new UnauthorizedException(customHttpException.PAYMENT_NOT_CERT_USER);
        }

        // 멤버십 할인금액
        const membershipDiscountAmount = Math.floor(
          (payment.originalAmount - payment.discountAmount) * employer.membership.discountRate,
        );
        // ✅ 8. 적용된 쿠폰 정보 가져오기
        // let appliedCoupon = null;
        const couponDiscountAmount = 0;

        // XXX - 보류
        if (payment.appliedCouponId) {
          const employerCoupon = await manager.findOne(EmployerCoupon, {
            where: { id: payment.appliedCouponId, employer: { id: userId } },
            relations: ['coupon'],
          });

          // if (employerCoupon) {
          //   const coupon = employerCoupon.coupon;
          //   appliedCoupon = {
          //     id: coupon.id,
          //     discountType: coupon.discountType,
          //     discountRate: coupon.discountRate,
          //     discountAmount: coupon.discountAmount,
          //     isSingleUse: coupon.isSingleUse,
          //   };

          //   if (coupon.discountType === DiscountType.PERCENTAGE) {
          //     couponDiscountAmount = Math.min(originalProductAmount * coupon.discountRate, coupon.maxDiscountAmount || Infinity);
          //   } else {
          //     couponDiscountAmount = coupon.discountAmount;
          //   }
          // }
        }

        // 총 할인 금액
        const totalDiscountAmount = payment.discountAmount;

        // 최종 결제 금액 계산
        const finalTotalAmount = payment.totalAmount;

        const recruitmentItem = payment.recruitmentPayments[0].recruitment;
        const recruitmentPayment = payment.recruitmentPayments[0];

        // ✅ 9. 주문 정보 응답
        return {
          orderId: payment.orderId,
          paymentStatus: payment.paymentStatus,
          expiresAt: payment.expiresAt,
          appliedCouponId: payment.appliedCouponId,
          // appliedCoupon, // XXX - 보류
          certificationInfo: {
            phone: employer.certification.phone_no,
            userName: employer.certification.user_name,
            managerEmail: employer.company.managerEmail,
          },
          amountInfo: {
            originalAmount: payment.originalAmount,
            productDiscountAmount: payment.discountAmount, // 상품 할인
            membershipDiscountRate: employer.membership.discountRate, // 멤버십 할인율
            membershipDiscountAmount, // 멤버십 할인금액
            couponDiscountAmount, // 쿠폰 할인 금액
            totalDiscountAmount, // 전체 할인 금액 (상품 할인 + 멤버십 할인)
            finalTotalAmount: finalTotalAmount, // 최종 결제 금액
          },
          recruitmentInfo: {
            id: recruitmentItem.id,
            recruitmentTitle: recruitmentItem.recruitmentTitle,
            jobs: recruitmentItem.jobs,
            createdAt: recruitmentItem.createdAt,
          },
          productInfo: {
            id: recruitmentPayment.id,
            name: recruitmentPayment.name,
            type: recruitmentPayment.type,
            duration: recruitmentPayment.duration,
            bonusDays: recruitmentPayment.bonusDays,
            price: recruitmentPayment.price,
            discountRate: recruitmentPayment.discountRate,
            options: recruitmentPayment.options.map((option) => ({
              id: option.id,
              name: option.name,
              duration: option.duration,
              price: option.price,
              maxListUpPerDay: option.maxListUpPerDay,
              listUpIntervalHours: option.listUpIntervalHours,
              tags: option.tags,
            })),
          },
        };
      } catch (error) {
        this.logger.error(`PAYMENT DETAIL ERROR: ${error.message}`);
        if (error instanceof HttpException) {
          throw error;
        }

        throw new InternalServerErrorException();
      }
    });
  }

  async confirmRecruitmentPaymentDto(confirmRecruitmentPaymentDto: ConfirmRecruitmentPaymentDto, userId: string) {
    const { amount, orderId, paymentKey } = confirmRecruitmentPaymentDto;

    return this.dataSource.transaction(async (manager) => {
      const employer = await manager.findOne(Employer, { where: { id: userId }, relations: ['membership'] });

      if (!employer) {
        throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_EMPLOYER);
      }

      const payment = await manager.findOne(Payment, {
        where: { orderId, userId },
        relations: ['recruitmentPayments', 'recruitmentPayments.recruitment'],
      });

      if (!payment) {
        throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_ORDER);
      }

      // 주문 만료 검증(중요 - 검증 안 하면 주문 재 호출 시 캐치문 트랜잭션 내부에서 상태값 변경됨)
      if (payment.paymentStatus === PaymentStatus.PAYMENT_COMPLETED) {
        throw new BadRequestException(customHttpException.PAYMENT_ORDER_ALREADY_PROCESSED);
      }

      if (payment.orderId !== orderId) {
        throw new BadRequestException(customHttpException.PAYMENT_ORDER_TAMPERING_DETECTED);
      }

      if (payment.totalAmount !== amount) {
        throw new BadRequestException(customHttpException.PAYMENT_AMOUNT_TAMPERING_DETECTED);
      }

      try {
        const paymentResult = await this.tossService.confirmPayment(orderId, paymentKey, amount);
        console.log('토스페이먼츠 API : ', paymentResult);

        // 결제 트랜잭션 저장
        const paymentTransaction = manager.create(PaymentTransaction, {
          payment,
          mId: paymentResult.mId,
          lastTransactionKey: paymentResult.lastTransactionKey,
          paymentKey: paymentResult.paymentKey,
          orderId: paymentResult.orderId,
          orderName: paymentResult.orderName,
          status: paymentResult.status,
          secret: paymentResult.secret,
          method: paymentResult.method,
          type: paymentResult.type,
          failure: paymentResult.failure,
          isPartialCancelable: paymentResult.isPartialCancelable,
          totalAmount: paymentResult.totalAmount,
          balanceAmount: paymentResult.balanceAmount,
          suppliedAmount: paymentResult.suppliedAmount,
          vat: paymentResult.vat,
          receipt: {
            url: paymentResult?.receipt?.url ?? null,
          },

          issuerCode: paymentResult.card.issuerCode,
          acquirerCode: paymentResult.card.acquirerCode,
          number: paymentResult.card.number,
          installmentPlanMonths: paymentResult.card.installmentPlanMonths,
          isInterestFree: paymentResult.card.isInterestFree,
          interestPayer: paymentResult.card.interestPayer,
          approveNo: paymentResult.card.approveNo,
          useCardPoint: paymentResult.card.useCardPoint,
          cardType: paymentResult.card.cardType,
          ownerType: paymentResult.card.ownerType,
          acquireStatus: paymentResult.card.acquireStatus,
          receiptUrl: paymentResult.card.receiptUrl,
          amount: paymentResult.card.amount,

          requestedAt: paymentResult.requestedAt,
          approvedAt: paymentResult.approvedAt,
        });
        await manager.save(paymentTransaction);

        // payment 업데이트
        payment.paymentStatus = PaymentStatus.PAYMENT_COMPLETED;
        payment.paymentMethod = paymentResult.method;
        await manager.save(payment);

        // 포인트 적립
        const earnedPoint = Math.floor(payment.totalAmount * POINT_RATE);
        const pointTransaction = manager.create(PointTransaction, {
          employer,
          payment,
          point: earnedPoint,
          type: PointTransactionType.EARN,
          description: '공고 결제 포인트 적립',
          expirationDate: addYears(new Date(), 1),
        });

        employer.totalPoint += earnedPoint;
        await manager.save(pointTransaction);
        await manager.save(employer);

        // 기존 멤버십 저장
        const previousMembership = employer.membership;
        const previousScore = employer.totalScore;

        //멤버십 스코어 업데이트
        employer.totalScore += payment.totalAmount;
        await manager.save(employer);

        //멤버십 등급 자동 승급
        const newMembership = await manager.findOne(Membership, {
          where: { minScore: LessThanOrEqual(employer.totalScore), maxScore: MoreThanOrEqual(employer.totalScore) },
        });

        if (newMembership && employer.membership?.id !== newMembership.id) {
          employer.membership = newMembership;
          await manager.save(employer);
        }

        // 채용공고 상태 변경, 게시기간 설정
        for (const recruitmentPayment of payment.recruitmentPayments) {
          if (recruitmentPayment.recruitment) {
            if (recruitmentPayment.recruitment.recruitmentStatus === RecruitmentStatus.PUBLISHED) {
              recruitmentPayment.recruitment.recruitmentStatus = RecruitmentStatus.PROGRESS;
              console.log('duration: ', recruitmentPayment.duration);
              console.log('bonusDays: ', recruitmentPayment.bonusDays);
              const { startDate, endDate } = calculatePostingPeriod(
                recruitmentPayment.duration,
                recruitmentPayment.bonusDays,
              );
              console.log('계산된 시작일: ', startDate);
              console.log('계산된 마감일: ', endDate);

              recruitmentPayment.recruitment.postingStartDate = startDate;
              recruitmentPayment.recruitment.postingEndDate = endDate;
            }

            await manager.save(recruitmentPayment.recruitment);
          }
        }

        return {
          paymentInfo: {
            orderId: payment.orderId,
            totalAmount: payment.totalAmount,
          },
          pointInfo: {
            earnedPoint: earnedPoint,
            totalPoint: employer.totalPoint,
          },
          membershipInfo: {
            previousScore: previousScore,
            addedScore: payment.totalAmount,
            currentScore: employer.totalScore,
            currentLevel: newMembership.membershipLevel,
            previousLevel: previousMembership.membershipLevel,
            previousMinScore: previousMembership.minScore,
            previousMaxScore: previousMembership.maxScore,
            isUpgraded: previousMembership?.id !== newMembership?.id,
          },
        };
      } catch (error) {
        console.log('error: ', error.message);
        if (error.response?.data?.code) {
          console.log('error.response?.data?.code: ', error.response?.data?.code);
          const errorCode = error.response?.data?.code;
          const errorMessage = error.response?.data?.message;
          this.logger.error(`❌ Payment Error - Code: ${errorCode}, Message: ${errorMessage}`);

          // 실패 처리 로직 별도 트랜잭션으로 저장
          await this.dataSource.transaction(async (innerManager) => {
            // 결제기간 만료 or 결제 실패
            console.log('이너 트랜잭션???????????????????????');
            payment.paymentStatus =
              errorCode === 'NOT_FOUND_PAYMENT_SESSION' ? PaymentStatus.PAYMENT_EXPIRED : PaymentStatus.PAYMENT_FAILED;

            payment.failureReason = { code: errorCode, message: errorMessage };

            await innerManager.save(payment);
          });

          throw new BadRequestException({
            customCode: errorCode,
            message: errorMessage || 'Payment confirmation failed',
          });
        }

        if (error instanceof HttpException) {
          throw error; // 상위 레이어 에러는 그대로 throw
        }

        throw new BadRequestException(customHttpException.PAYMENT_CONFIRM_FAILED);
      }
    });
  }

  async applyCoupon(orderId: string, couponId: string, userId: string) {
    return this.dataSource.transaction(async (manager) => {
      // ✅ 1. 주문 정보 조회 + 결제 상태 확인
      const payment = await manager.findOne(Payment, { where: { orderId, userId } });
      if (!payment) throw new BadRequestException('주문을 찾을 수 없습니다.');
    });
  }
}
