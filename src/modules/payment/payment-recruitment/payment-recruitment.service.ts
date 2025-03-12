import { InitiateRecruitmentPaymentDto } from './dto/initiate-recruitment-payment.dto';
import { Payment } from '../entities/payment.entity';
import { Employer } from '../../employers/entities/employer.entity';
import { PaymentRecruitment, PaymentRecruitmentOptions } from './entities/payment-recruitment.entity';
import { RecruitmentProduct } from '../../products/entities/recruitment.entity';
import { RecruitmentProductOption } from '../../products/entities/recruitment-option.entity';
import { DataSource, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { customHttpException } from '../../../common/constants/custom-http-exception';
import { PaymentStatus, PaymentType } from '../../../common/constants/payment';
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
import { RecruitmentProductOptionName } from '../../../common/constants/product';
import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApplyCouponDto } from './dto/apply-coupon.dto';
import { DiscountType } from '../../../common/constants/coupon';
import { CancelCouponDto } from './dto/cancel-coupon.dto';
import { ConfirmFreeRecruitmentPaymentDto } from './dto/confirm-free-recruitment-payment.dto';
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

        // 검증 - 채용공고 존재 하지않음
        if (!recruitment) {
          throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_RECRUITMENT);
        }

        // 검증 - 채용공고 상태
        if (recruitment.recruitmentStatus !== RecruitmentStatus.PUBLISHED) {
          throw new BadRequestException(customHttpException.PAYMENT_NOT_PUBLISHED_RECRUITMENT);
        }

        const completedPayment = await manager.findOne(PaymentRecruitment, {
          where: {
            recruitment,
            payment: { paymentStatus: PaymentStatus.PAYMENT_COMPLETED },
          },
          relations: ['payment'],
        });

        // 검증 - 이미 결제된 채용공고
        if (completedPayment) {
          throw new BadRequestException(customHttpException.PAYMENT_INVALID_STATUS);
        }

        // 검증 - 상품
        const product = await manager.findOne(RecruitmentProduct, {
          where: { id: dto.id },
        });

        if (!product) {
          throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_PRODUCT);
        }

        // 검증 - 상품 옵션
        for (const option of dto.options) {
          const productOption = await manager.findOne(RecruitmentProductOption, {
            where: { id: option.id },
          });

          if (!productOption) {
            throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_PRODUCT);
          }
        }

        const productPrice = dto.duration.price; // 상품 - 기본가격
        const productDiscount = Math.floor(productPrice * dto.duration.discountRate); // 상품 - 할인 적용 가격

        // 상품 - 옵션 기본 가격
        const totalOptionsPrice = dto.options.reduce((sum, option) => sum + option.price, 0);

        // 상품 - 옵션 할인 적용 가격
        const totalOptionsDiscount = dto.options.reduce((sum, option) => {
          return sum + Math.floor(option.price * option.discountRate);
        }, 0);

        // 상품 가격 (상품 + 옵션)
        const originalAmount = productPrice + totalOptionsPrice;

        // 상품 할인 가격 (상품 + 옵션)
        const discountAmount = productDiscount + totalOptionsDiscount;

        // 멤버십 할인금액 10원단위 소수점내림
        const membershipDiscountAmount =
          Math.floor(((originalAmount - discountAmount) * employer.membership.discountRate) / 10) * 10;

        // 최종 할인 금액 (할인금액 - 멤버십 할인금액)
        const totalDiscountAmount = discountAmount + membershipDiscountAmount;

        // 최종 결제 금액 (멤버십 할인 포함)
        const finalTotalAmount = originalAmount - totalDiscountAmount;
        // console.log('originalAmount: ', originalAmount);
        // console.log('totalDiscountAmount: ', totalDiscountAmount);

        // Payment 데이터 생성
        const payment = manager.create(Payment, {
          userId,
          originalAmount,
          discountAmount,
          totalDiscountAmount,
          totalAmount: finalTotalAmount, // 초기 결제 금액
          paymentStatus: PaymentStatus.PAYMENT_PENDING,
          paymentType: PaymentType.RECRUITMENT,
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

        // 주문 금액이 0원 이하인지 확인 (쿠폰 미사용 시 0원 이하면 주문 삭제)
        if (payment.appliedCouponId === null && payment.totalAmount <= 0) {
          await manager.remove(payment);
          await manager.query(`COMMIT`);
          throw new InternalServerErrorException(customHttpException.PAYMENT_INVALID_TOTAL_AMOUNT);
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

        // 멤버십 할인금액 (10원단위 소수점내림)
        const membershipDiscountAmount =
          Math.floor(((payment.originalAmount - payment.discountAmount) * employer.membership.discountRate) / 10) * 10;

        // 총 할인 금액
        const totalDiscountAmount = payment.totalDiscountAmount;

        // 최종 결제 금액 계산 초기화에서 멤버십 적용
        const totalAmount = payment.totalAmount;

        const recruitmentItem = payment.recruitmentPayments[0].recruitment;
        const recruitmentPayment = payment.recruitmentPayments[0];

        // ✅ 9. 주문 정보 응답
        return {
          orderId: payment.orderId,
          paymentStatus: payment.paymentStatus,
          expiresAt: payment.expiresAt,
          appliedCouponId: payment.appliedCouponId,
          certificationInfo: {
            phone: employer.certification.phone_no,
            userName: employer.certification.user_name,
            managerEmail: employer.company.managerEmail,
          },
          amountInfo: {
            originalAmount: payment.originalAmount,
            discountAmount: payment.discountAmount, // 상품 할인

            membershipDiscountAmount, // 멤버십 할인금액
            membershipDiscountRate: employer.membership.discountRate, // 멤버십 할인율
            couponDiscountAmount: payment.couponDiscountAmount, // 쿠폰 할인금액
            totalDiscountAmount, // 전체 할인 금액 (상품 할인 + 멤버십 할인)

            TotalAmount: totalAmount, // 최종 결제 금액
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
              bonusDays: option.bonusDays,
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

  /**
   * 결제 승인 요청
   */
  async confirmRecruitmentPaymentDto(confirmRecruitmentPaymentDto: ConfirmRecruitmentPaymentDto, userId: string) {
    const { amount, orderId, paymentKey } = confirmRecruitmentPaymentDto;

    return this.dataSource.transaction(async (manager) => {
      const employer = await manager.findOne(Employer, { where: { id: userId }, relations: ['membership'] });

      if (!employer) {
        throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_EMPLOYER);
      }

      const payment = await manager.findOne(Payment, {
        where: { orderId, userId },
        relations: ['recruitmentPayments', 'recruitmentPayments.recruitment', 'recruitmentPayments.options'],
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

        // 쿠폰 사용 처리
        if (payment.appliedCouponId) {
          const targetCoupon = await manager.findOne(EmployerCoupon, {
            where: { id: payment.appliedCouponId, employer: { id: userId } },
            relations: ['coupon'],
          });

          if (!targetCoupon) {
            throw new BadRequestException(customHttpException.COUPON_NOT_FOUND);
          }

          if (targetCoupon.isUsed) {
            throw new BadRequestException(customHttpException.COUPON_ALREADY_USED);
          }

          targetCoupon.isUsed = true;
          targetCoupon.usedAt = new Date();
          await manager.save(targetCoupon);
        }

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
          const recruitment = recruitmentPayment.recruitment;

          if (!recruitment) {
            continue;
          }

          if (recruitment.recruitmentStatus !== RecruitmentStatus.PUBLISHED) {
            continue;
          }

          const isListUpProduct = recruitmentPayment.options.some(
            (option) => option.name === RecruitmentProductOptionName.LIST_UP,
          );

          recruitment.recruitmentStatus = RecruitmentStatus.PROGRESS;
          recruitment.priorityDate = new Date();
          recruitment.isListUp = isListUpProduct;

          const { startDate, endDate } = calculatePostingPeriod(
            recruitmentPayment.duration,
            recruitmentPayment.bonusDays,
          );

          recruitment.postingStartDate = startDate;
          recruitment.postingEndDate = endDate;

          const updatedOptions = recruitmentPayment.options.map((option) => {
            const { startDate: optionStartDate, endDate: optionEndDate } = calculatePostingPeriod(
              option.duration,
              option.bonusDays,
            );

            return {
              ...option,
              postingStartDate: optionStartDate,
              postingEndDate: optionEndDate,
            };
          });

          await manager.save(PaymentRecruitmentOptions, updatedOptions);

          await manager.save(recruitment);
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
            currentLevel: newMembership.membershipLevel ?? 'unknown',
            previousLevel: previousMembership.membershipLevel,
            previousMinScore: previousMembership.minScore,
            previousMaxScore: previousMembership.maxScore,
            isUpgraded: previousMembership?.id !== newMembership?.id,
          },
        };
      } catch (error) {
        console.log('error: ', error.message);
        if (error.response?.data?.code) {
          const errorCode = error.response.data.code;
          const errorMessage = error.response.data.message;
          this.logger.error(`❌ Payment Error - Code: ${errorCode}, Message: ${errorMessage}`);

          // 실패 처리 로직 별도 트랜잭션으로 저장
          await this.dataSource.transaction(async (innerManager) => {
            // 결제기간 만료 or 결제 실패
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

  /**
   * 무료 승인 요청
   */
  async confirmFreeRecruitmentPaymentDto(
    confirmFreeRecruitmentPaymentDto: ConfirmFreeRecruitmentPaymentDto,
    userId: string,
  ) {
    const { amount, orderId } = confirmFreeRecruitmentPaymentDto;

    return this.dataSource.transaction(async (manager) => {
      const employer = await manager.findOne(Employer, { where: { id: userId }, relations: ['membership'] });

      if (!employer) {
        throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_EMPLOYER);
      }

      const payment = await manager.findOne(Payment, {
        where: { orderId, userId },
        relations: ['recruitmentPayments', 'recruitmentPayments.recruitment', 'recruitmentPayments.options'],
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
        // 무료 결제
        if (payment.totalAmount === 0) {
          payment.paymentStatus = PaymentStatus.PAYMENT_COMPLETED;
          payment.paymentMethod = '쿠폰';
          await manager.save(payment);
        }

        // 쿠폰 사용 처리
        if (payment.appliedCouponId) {
          const targetCoupon = await manager.findOne(EmployerCoupon, {
            where: { id: payment.appliedCouponId, employer: { id: userId } },
            relations: ['coupon'],
          });

          if (!targetCoupon) {
            throw new BadRequestException(customHttpException.COUPON_NOT_FOUND);
          }

          if (targetCoupon.isUsed) {
            throw new BadRequestException(customHttpException.COUPON_ALREADY_USED);
          }

          targetCoupon.isUsed = true;
          targetCoupon.usedAt = new Date();
          await manager.save(targetCoupon);
        }

        // 채용공고 상태 변경, 게시기간 설정
        for (const recruitmentPayment of payment.recruitmentPayments) {
          const recruitment = recruitmentPayment.recruitment;

          if (!recruitment) {
            continue;
          }

          if (recruitment.recruitmentStatus !== RecruitmentStatus.PUBLISHED) {
            continue;
          }

          const isListUpProduct = recruitmentPayment.options.some(
            (option) => option.name === RecruitmentProductOptionName.LIST_UP,
          );

          recruitment.recruitmentStatus = RecruitmentStatus.PROGRESS;
          recruitment.priorityDate = new Date();
          recruitment.isListUp = isListUpProduct;

          const { startDate, endDate } = calculatePostingPeriod(
            recruitmentPayment.duration,
            recruitmentPayment.bonusDays,
          );

          recruitment.postingStartDate = startDate;
          recruitment.postingEndDate = endDate;

          const updatedOptions = recruitmentPayment.options.map((option) => {
            const { startDate: optionStartDate, endDate: optionEndDate } = calculatePostingPeriod(
              option.duration,
              option.bonusDays,
            );

            return {
              ...option,
              postingStartDate: optionStartDate,
              postingEndDate: optionEndDate,
            };
          });

          await manager.save(PaymentRecruitmentOptions, updatedOptions);

          await manager.save(recruitment);
        }

        return {
          paymentInfo: {
            orderId: payment.orderId,
            totalAmount: payment.totalAmount,
          },
          pointInfo: {
            earnedPoint: 0,
            totalPoint: employer.totalPoint,
          },
          membershipInfo: {
            previousScore: employer.totalScore,
            addedScore: payment.totalAmount,
            currentScore: employer.totalScore,
            currentLevel: employer.membership.membershipLevel,
            previousLevel: employer.membership.membershipLevel,
            previousMinScore: employer.membership.minScore,
            previousMaxScore: employer.membership.maxScore,
            isUpgraded: false,
          },
        };
      } catch (error) {
        console.log('error: ', error.message);
        if (error.response?.data?.code) {
          const errorCode = error.response.data.code;
          const errorMessage = error.response.data.message;
          this.logger.error(`❌ Payment Error - Code: ${errorCode}, Message: ${errorMessage}`);

          // 실패 처리 로직 별도 트랜잭션으로 저장
          await this.dataSource.transaction(async (innerManager) => {
            // 결제기간 만료 or 결제 실패
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

  /**
   * 사용가능한 쿠폰 목록 조회
   */
  async AvailableCoupon(orderId: string, userId: string) {
    return this.dataSource.transaction(async (manager) => {
      const payment = await manager.findOne(Payment, { where: { orderId, userId } });

      if (!payment) throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_ORDER);

      if (payment.paymentStatus === PaymentStatus.PAYMENT_COMPLETED) {
        throw new BadRequestException(customHttpException.PAYMENT_COMPLETED_STATUS);
      }

      if (payment.paymentStatus !== PaymentStatus.PAYMENT_PENDING) {
        throw new BadRequestException(customHttpException.PAYMENT_INVALID_STATUS);
      }

      const ownedCoupons = await manager.find(EmployerCoupon, {
        where: { employer: { id: userId } },
        relations: ['coupon'],
      });

      const now = new Date();

      const availableCoupons = [];
      const unavailableCoupons = [];

      ownedCoupons.forEach((item) => {
        const coupon = item.coupon;
        let reason = null;

        // 사용 여부
        if (item.isUsed) {
          reason = '사용한 쿠폰';
        }

        // 만료 여부
        if (item.expiresAt && now > item.expiresAt) {
          reason = '쿠폰 만료';
        }

        //  최소 주문 금액 미달
        if (payment.originalAmount < coupon.minOrderAmount) {
          reason = `최소 결제 금액이 충족되지 않습니다.`;
        }

        if (reason) {
          // 사용 불가능한 쿠폰
          unavailableCoupons.push({
            id: item.id,
            description: item.description,
            discountAmount: coupon.discountAmount,
            discountRate: coupon.discountRate,
            discountType: coupon.discountType,
            expiresAt: item.expiresAt,
            isUsed: item.isUsed,
            minOrderAmount: coupon.minOrderAmount,
            maxDiscountAmount: coupon.maxDiscountAmount,
            reason, // 사용 불가능한 사유
          });
        }
        if (!reason) {
          // 사용 가능한 쿠폰
          availableCoupons.push({
            id: item.id,
            description: item.description,
            discountAmount: coupon.discountAmount,
            discountRate: coupon.discountRate,
            discountType: coupon.discountType,
            expiresAt: item.expiresAt,
            isUsed: item.isUsed,
            minOrderAmount: coupon.minOrderAmount,
            maxDiscountAmount: coupon.maxDiscountAmount,
            reason: '',
          });
        }
      });

      return {
        availableCoupons,
        unavailableCoupons,
        totalCouponCount: availableCoupons.length,
      };
    });
  }

  /**
   * 쿠폰 적용
   */
  async applyCoupon(applyCouponDto: ApplyCouponDto, userId: string) {
    return this.dataSource.transaction(async (manager) => {
      // 주문 정보 조회 + 결제 상태 확인
      const payment = await manager.findOne(Payment, { where: { orderId: applyCouponDto.orderId, userId } });

      if (!payment) throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_ORDER);

      if (payment.paymentStatus === PaymentStatus.PAYMENT_COMPLETED) {
        throw new BadRequestException(customHttpException.PAYMENT_COMPLETED_STATUS);
      }

      if (payment.paymentStatus !== PaymentStatus.PAYMENT_PENDING) {
        throw new BadRequestException(customHttpException.PAYMENT_INVALID_STATUS);
      }

      // 쿠폰 정보 조회 + 검증
      const targetCoupon = await manager.findOne(EmployerCoupon, {
        where: { id: applyCouponDto.couponId, employer: { id: userId } },
        relations: ['coupon'],
      });

      if (!targetCoupon) {
        throw new BadRequestException(customHttpException.COUPON_NOT_FOUND);
      }

      if (targetCoupon.isUsed) {
        throw new BadRequestException(customHttpException.COUPON_ALREADY_USED);
      }

      if (payment.appliedCouponId === targetCoupon.id) {
        return { status: ResponseStatus.DUPLICATE };
      }

      const now = new Date();

      if (targetCoupon.expiresAt && now > targetCoupon.expiresAt) {
        throw new BadRequestException(customHttpException.COUPON_EXPIRES);
      }

      let couponDiscountAmount = 0;

      if (targetCoupon.coupon.discountType === DiscountType.FIXED) {
        couponDiscountAmount = targetCoupon.coupon.discountAmount;
      }

      // TODO: 할인율로 쿠폰 기능 추가
      // if (targetCoupon.coupon.discountType === DiscountType.PERCENTAGE) {
      //   // !!! 퍼센트 할인 시 - 최대 할인 금액 초과 시 작은 금액으로 할인
      //   if (targetCoupon.coupon.maxDiscountAmount) {
      //     couponDiscountAmount = Math.min(couponDiscountAmount, targetCoupon.coupon.maxDiscountAmount);
      //   }
      // }

      let updateTotalDiscountAmount = 0;
      let updateTotalAmount = 0;

      // 쿠폰이 이미 적용된 경우
      if (payment.appliedCouponId) {
        updateTotalDiscountAmount = payment.totalDiscountAmount - payment.couponDiscountAmount + couponDiscountAmount;
        updateTotalAmount = payment.totalAmount + payment.couponDiscountAmount - couponDiscountAmount;
      }

      // 쿠폰이 적용되지 않은 경우
      if (!payment.appliedCouponId) {
        updateTotalDiscountAmount = payment.totalDiscountAmount + couponDiscountAmount;
        updateTotalAmount = payment.totalAmount - couponDiscountAmount;
      }

      // !!! 최종 결제 금액이 음수로 내려갈 경우 무료 결제로 처리
      if (updateTotalAmount < 0) {
        updateTotalAmount = 0;
      }

      payment.totalDiscountAmount = updateTotalDiscountAmount;
      payment.appliedCouponId = targetCoupon.id; // 적용된 쿠폰 ID
      payment.couponDiscountAmount = couponDiscountAmount;
      payment.totalAmount = updateTotalAmount;

      await manager.save(payment);

      return { status: ResponseStatus.SUCCESS };
    });
  }

  /**
   * 쿠폰 적용 취소
   */
  async cancelCoupon(cancelCouponDto: CancelCouponDto, userId: string) {
    const { couponId, orderId } = cancelCouponDto;

    return this.dataSource.transaction(async (manager) => {
      // 주문 정보 조회 + 결제 상태 확인
      const payment = await manager.findOne(Payment, { where: { orderId, userId } });

      if (!payment) {
        throw new BadRequestException(customHttpException.PAYMENT_NOT_FOUND_ORDER);
      }

      if (payment.paymentStatus === PaymentStatus.PAYMENT_COMPLETED) {
        throw new BadRequestException(customHttpException.PAYMENT_COMPLETED_STATUS);
      }

      if (payment.paymentStatus !== PaymentStatus.PAYMENT_PENDING) {
        throw new BadRequestException(customHttpException.PAYMENT_INVALID_STATUS);
      }

      // 적용된 쿠폰 검증
      if (!payment.appliedCouponId) {
        throw new BadRequestException(customHttpException.COUPON_NOT_APPLIED);
      }

      // 기존 적용된 쿠폰 ID 검증
      if (payment.appliedCouponId !== couponId) {
        throw new BadRequestException(customHttpException.COUPON_NOT_APPLIED);
      }

      // 적용된 쿠폰 정보 조회
      const targetCoupon = await manager.findOne(EmployerCoupon, {
        where: { id: payment.appliedCouponId, employer: { id: userId } },
        relations: ['coupon'],
      });

      if (!targetCoupon) {
        throw new BadRequestException(customHttpException.COUPON_NOT_FOUND);
      }

      // 이전 쿠폰 할인 금액
      const previousCouponDiscount = payment.couponDiscountAmount;

      // 기존 할인 금액에서 쿠폰 할인 금액 제거
      const updatedTotalDiscountAmount = payment.totalDiscountAmount - previousCouponDiscount;

      // 기존 결제 금액에 쿠폰 할인 금액을 다시 더함
      const updatedTotalAmount = payment.totalAmount + previousCouponDiscount;

      // 결제 정보 업데이트
      payment.appliedCouponId = null;
      payment.couponDiscountAmount = 0;
      payment.totalDiscountAmount = updatedTotalDiscountAmount;
      payment.totalAmount = updatedTotalAmount;

      await manager.save(payment);

      return {
        status: ResponseStatus.SUCCESS,
      };
    });
  }
}
