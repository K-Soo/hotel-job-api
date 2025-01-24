import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PaymentRecruitment } from '../payment-recruitment/entities/payment-recruitment.entity';

@Entity()
export class Payment {
  @OneToMany(() => PaymentRecruitment, (paymentRecruitment) => paymentRecruitment.payment)
  recruitPayments: PaymentRecruitment[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: number; // 결제를 시도한 사용자

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number; // 결제 금액

  @Column({ default: 'PENDING' })
  status: string; // 결제 상태 (PENDING, COMPLETED, FAILED, CANCELLED)

  @Column({ nullable: true })
  failure_reason: string; // 결제 실패 사유

  @Column({ nullable: true })
  payment_method: string; // 결제 수단 (예: 카드, 계좌이체)

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date; // 상태 변경 시각
}
