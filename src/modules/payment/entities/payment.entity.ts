import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { PaymentRecruitment } from '../payment-recruitment/entities/payment-recruitment.entity';
import { PaymentStatus } from '../../../common/constants/payment';
import { addMinutes } from 'date-fns';
import { EmployerCoupon } from '../../coupon/entities/employer-coupon.entity';
import { PaymentTransaction } from './payment-transaction.entity';

@Entity()
export class Payment {
  @OneToMany(() => PaymentTransaction, (transaction) => transaction.payment)
  transactions: PaymentTransaction[];

  @OneToMany(() => PaymentRecruitment, (paymentRecruitment) => paymentRecruitment.payment)
  recruitmentPayments: PaymentRecruitment[];

  @ManyToOne(() => EmployerCoupon, { nullable: true }) // 적용된 쿠폰 (nullable: 쿠폰이 없어도 가능)
  @JoinColumn({ name: 'employer_coupon_id' })
  employerCoupon: EmployerCoupon | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  orderId: string;

  @Column({ type: 'varchar', length: 255 })
  userId: string;

  @Column({ type: 'uuid', nullable: true })
  appliedCouponId: string | null; // 적용된 쿠폰 ID (없으면 null)

  @Column({ type: 'int' })
  originalAmount: number; // 할인 전 상품금액

  @Column({ type: 'int', default: 0 })
  discountAmount: number; // 할인 금액

  @Column({ type: 'int' })
  totalAmount: number; // ✅ 총 결제 금액 (상품금액 - 할인금액)

  @Column({ type: 'enum', enum: PaymentStatus, default: 'PAYMENT_PENDING' })
  paymentStatus: PaymentStatus;

  @Column({ nullable: true })
  paymentMethod: '카드' | '가상계좌' | '간편결제' | '휴대폰';

  @Column({ type: 'jsonb', nullable: true })
  failureReason: { code: string; message: string } | null;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  @Column({ type: 'timestamptz', precision: 0 })
  expiresAt: Date; // 주문 만료 시간

  @BeforeInsert()
  setExpiration() {
    this.expiresAt = addMinutes(new Date(), 30); // 주문 생성 후 30분 유효
  }

  @BeforeInsert()
  setDefaultStatus() {
    this.paymentStatus = PaymentStatus.PAYMENT_PENDING;
  }

  @BeforeInsert()
  generateOrderId() {
    this.orderId = Payment.generateUniqueOrderId();
  }

  static generateUniqueOrderId(): string {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const timeStr = now.toTimeString().slice(0, 5).replace(/:/g, ''); // HHMM
    const millieStr = now.getMilliseconds().toString().padStart(6, '0'); // 밀리초 6자리

    return `${dateStr}${timeStr}${millieStr}`;
  }
}
