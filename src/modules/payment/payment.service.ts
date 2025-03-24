import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentStatus, PaymentType } from '../../common/constants/payment';
@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(@InjectRepository(Payment) private paymentRepo: Repository<Payment>) {}

  async paymentList(userId: string) {
    const payments = await this.paymentRepo
      .createQueryBuilder('payment')
      .leftJoin('payment.transactions', 'transactions')
      .addSelect([
        'transactions.id',
        'transactions.totalAmount',
        'transactions.cardType',
        'transactions.method',
        'transactions.orderName',
        'transactions.installmentPlanMonths',
        'transactions.number',
        'transactions.approvedAt',
        'transactions.orderId',
      ])
      .leftJoin('payment.recruitmentPayments', 'recruitmentPayments')
      .addSelect(['recruitmentPayments.id'])
      .leftJoin('recruitmentPayments.recruitment', 'recruitment')
      .addSelect(['recruitment.id', 'recruitment.recruitmentTitle'])
      .where('payment.userId = :userId', { userId })
      .andWhere('payment.paymentType = :paymentType', { paymentType: PaymentType.RECRUITMENT })
      .andWhere('payment.paymentStatus = :paymentStatus', { paymentStatus: PaymentStatus.PAYMENT_COMPLETED })
      .orderBy('payment.createdAt', 'DESC')
      .getMany();

    const formattedPayments = payments.map((payment) => {
      const { transactions, recruitmentPayments, ...rest } = payment;

      if (!recruitmentPayments?.[0]?.recruitment) {
        this.logger.error(`Missing recruitment for payment ${payment.id}`);

        return null;
      }

      return {
        ...rest,
        transactions,
        recruitment: {
          id: recruitmentPayments[0].recruitment.id,
          recruitmentTitle: recruitmentPayments[0].recruitment.recruitmentTitle,
        },
      };
    });

    return formattedPayments;
  }
}
