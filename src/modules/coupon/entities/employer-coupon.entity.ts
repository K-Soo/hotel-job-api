import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Coupon } from './coupon.entity';
import { Employer } from '../../employers/entities/employer.entity';

@Entity()
export class EmployerCoupon {
  @ManyToOne(() => Employer, (employer) => employer.coupon, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employer_id', referencedColumnName: 'id' })
  employer: Employer;

  @ManyToOne(() => Coupon, (coupon) => coupon.employerCoupon, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'coupon_id' })
  coupon: Coupon | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'boolean', default: false }) // 만료 상태
  isExpired: boolean;

  @Column({ type: 'boolean', default: false })
  isUsed: boolean;

  @Column({ type: 'timestamptz', precision: 6 })
  issuedAt: Date;

  @Column({ type: 'timestamptz', precision: 6, nullable: true })
  usedAt: Date | null;

  @Column({ type: 'timestamptz', nullable: true, precision: 6, default: null })
  expiresAt: Date | null; // 특정 유저에게 발급된 쿠폰의 만료일 (개별 설정 가능)

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;
}
