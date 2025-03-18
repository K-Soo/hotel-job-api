import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { PaymentRecruitment } from '../../modules/payment/payment-recruitment/entities/payment-recruitment.entity';
import { PaymentStatus, PaymentType } from '../../common/constants/payment';
import { Payment } from '../../modules/payment/entities/payment.entity';
@Injectable()
export class PaymentsScheduler {
  private readonly logger = new Logger(PaymentsScheduler.name);

  constructor(private readonly dataSource: DataSource) {}

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async expirePendingPayments() {
    this.logger.log('🕒 [스케줄러 실행] pending 상태의 payment를 expired로 변경');

    const thirtyMinutesAgo = new Date();
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

    const pendingPayments = await this.dataSource
      .createQueryBuilder(Payment, 'payment')
      .leftJoinAndSelect('payment.recruitmentPayments', 'recruitmentPayments')
      .leftJoinAndSelect('recruitmentPayments.options', 'options')
      .where('payment.paymentStatus = :paymentStatus', { paymentStatus: PaymentStatus.PAYMENT_PENDING })
      .andWhere('payment.paymentType = :paymentType', { paymentType: PaymentType.RECRUITMENT })
      .andWhere('payment.expiresAt < :thirtyMinutesAgo', { thirtyMinutesAgo })
      .getMany();

    console.log('pendingPayments: ', pendingPayments);

    if (pendingPayments.length === 0) {
      console.log('[스케줄러 완료] 대기중 주문서 없음');
      return;
    }

    for (const payment of pendingPayments) {
      payment.paymentStatus = PaymentStatus.PAYMENT_EXPIRED;
      payment.failureReason = {
        code: 'PAYMENT_EXPIRED_ORDER',
        message: '주문 시간 만료 [Scheduler]',
      };

      await this.dataSource.getRepository(Payment).save(payment);
    }

    this.logger.log(`🕒 [스케줄러 완료] ${pendingPayments.length}개의 PENDING 결제건을 EXPIRED로 변경 완료`);
  }

  @Cron('0 0 1,15 * *')
  async deleteExpiredPayments() {
    this.logger.log('🕒 [스케줄러 실행] expired 상태의 recruitment를 삭제');

    const expiredPayments = await this.dataSource
      .createQueryBuilder(Payment, 'payment')
      .leftJoinAndSelect('payment.recruitmentPayments', 'recruitmentPayments')
      .leftJoinAndSelect('recruitmentPayments.options', 'options')
      .where('payment.paymentStatus = :paymentStatus', { paymentStatus: PaymentStatus.PAYMENT_EXPIRED })
      .andWhere('payment.paymentType = :paymentType', { paymentType: PaymentType.RECRUITMENT })
      .getMany();

    if (expiredPayments.length === 0) {
      console.log('[스케줄러 완료] 만료된 주문서 없음');
      return;
    }

    // 만료된 recruitmentPayments 먼저 삭제
    const paymentIds = expiredPayments.map((payment) => payment.id);

    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(PaymentRecruitment)
      .where('payment_id IN (:...paymentIds)', { paymentIds })
      .execute();

    // payment 삭제
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Payment)
      .where('id IN (:...paymentIds)', { paymentIds })
      .execute();

    this.logger.log(`🕒 [스케줄러 완료] ${expiredPayments.length}개의 만료된 주문서 및 관련 데이터 삭제 완료`);
  }
}
