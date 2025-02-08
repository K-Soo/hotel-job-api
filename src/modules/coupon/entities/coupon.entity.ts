import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { DiscountType } from '../../../common/constants/coupon';
import { EmployerCoupon } from './employer-coupon.entity';

@Entity()
export class Coupon {
  @OneToMany(() => EmployerCoupon, (employerCoupon) => employerCoupon.coupon)
  employerCoupon: EmployerCoupon[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'enum', enum: DiscountType })
  discountType: DiscountType; // 할인 유형 (정액 or 퍼센트)

  @Column({ type: 'numeric', precision: 4, scale: 2, default: 0 })
  discountRate: number; // 할인율 (ex: 0.1)

  @Column({ type: 'int', default: 0 })
  discountAmount: number; // 정액 할인 금액 (예: 5000원)

  @Column({ type: 'int', default: 0 })
  minOrderAmount: number; // 최소 주문 금액

  @Column({ type: 'int', default: 0 }) // 퍼센트 할인 시 최대 할인 금액 설정 (0이면 무제한)
  maxDiscountAmount: number;

  @Column({ type: 'boolean', default: true })
  isSingleUse: boolean; // 1회 사용 가능 여부 (true면 한 번 사용 후 소멸)

  @Column({ type: 'boolean', default: false })
  isPublic: boolean; // true면 모든 사용자에게 발급 가능 (ex: "WELCOME10")

  @Column({ type: 'timestamptz', nullable: true, precision: 0, default: null })
  expiresAt: Date | null; // 쿠폰 만료일 (기본값: 무제한)

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;
}
