import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { Coupon } from '../../modules/coupon/entities/coupon.entity';
import { EmployerCoupon } from '../../modules/coupon/entities/employer-coupon.entity';
import { Employer } from '../../modules/employers/entities/employer.entity';
import { MONTHLY_COUPON_CODE } from '../../common/constants/coupon';
import { dateFormat } from '../../common/utils/dateFormat';

@Injectable()
export class CouponScheduler {
  private readonly logger = new Logger(CouponScheduler.name);

  constructor(private readonly dataSource: DataSource) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async expireCoupons() {
    this.logger.log('🕒 [스케줄러 시작] 만료된 쿠폰 정리');
    const now = new Date();

    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(EmployerCoupon)
      .where('expiresAt IS NOT NULL')
      .andWhere('expiresAt <= :now', { now })
      .execute();

    this.logger.log('🕒 [스케줄러 종료] 만료된 쿠폰 정리');
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async assignMonthlyCoupons() {
    this.logger.log('🕒 [스케줄러 시작] 매달 1일 멤버십 등급에 맞는 쿠폰 발급');

    try {
      await this.dataSource.transaction(async (transactionManager) => {
        const employers = await transactionManager.find(Employer, {
          relations: ['membership'],
        });

        const firstDayOfMonth = dateFormat.getFirstDayOfMonth();
        const lastDayOfMonth = dateFormat.getLastDayOfMonth();
        const currentMonth = dateFormat.getCurrentMonth();

        for (const employer of employers) {
          const membershipLevel = employer.membership?.membershipLevel;

          if (!membershipLevel) {
            this.logger.warn(`[스케줄러] 멤버십 정보가 없는 사용자: ${employer.nickname}`);
            continue;
          }

          // 멤버십 등급에 해당하는 쿠폰 찾기 (예: BRONZE → BRONZE_1000)
          const couponCode = MONTHLY_COUPON_CODE[membershipLevel];

          const coupon = await transactionManager.findOne(Coupon, {
            where: { code: couponCode },
          });

          if (!coupon) {
            this.logger.warn(`쿠폰 코드 ${couponCode} 가 존재하지 않습니다.`);
            continue;
          }

          // 이미 해당 월에 발급된 쿠폰인지 확인
          const existingCoupon = await transactionManager.findOne(EmployerCoupon, {
            where: {
              employer: { id: employer.id },
              coupon: { id: coupon.id },
              issuedAt: firstDayOfMonth,
            },
          });

          if (existingCoupon) {
            this.logger.log(`이미 발급된 쿠폰이 존재합니다: ${employer.nickname}`);
            continue;
          }

          const employerCoupon = transactionManager.create(EmployerCoupon, {
            employer,
            coupon,
            description: `${currentMonth}월 ${membershipLevel} 쿠폰`,
            isUsed: false,
            issuedAt: firstDayOfMonth, // 발급일: 이번 달 1일
            expiresAt: lastDayOfMonth, // 만료일: 다음 달 1일
          });

          await transactionManager.save(employerCoupon);

          this.logger.log(
            `🎁 쿠폰 발급 완료: ${employer.nickname} (쿠폰 코드: ${coupon.code}) (만료일: ${lastDayOfMonth})`,
          );
          this.logger.log('🕒 [스케줄러 종료] 매달 1일 멤버십 등급에 맞는 쿠폰 발급');
        }
      });
    } catch (error) {
      this.logger.error('쿠폰 발급 중 오류 발생:', error);
    }
  }
}
