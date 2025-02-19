import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Recruitment } from '../../../employers/recruitment/entities/recruitment.entity';
import { RecruitmentDuration } from '../../../../common/constants/product';
import { Payment } from '../../entities/payment.entity';
import {
  RecruitmentProductType,
  RecruitmentProductName,
  RecruitmentOptionTag,
  RecruitmentProductOptionName,
} from '../../../../common/constants/product';

@Entity('payment_recruitment')
export class PaymentRecruitment {
  @ManyToOne(() => Recruitment, (recruitment) => recruitment.paymentRecruitment, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  recruitment: Recruitment | null;

  @ManyToOne(() => Payment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payment_id', referencedColumnName: 'id' })
  payment: Payment;

  @OneToMany(
    () => PaymentRecruitmentOptions,
    (paymentRecruitmentOptions) => paymentRecruitmentOptions.paymentRecruitment,
    { cascade: true },
  )
  options: PaymentRecruitmentOptions[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RecruitmentProductName })
  name: RecruitmentProductName;

  @Column({ type: 'enum', enum: RecruitmentProductType })
  type: RecruitmentProductType;

  @Column({ type: 'enum', enum: RecruitmentDuration })
  duration: RecruitmentDuration;

  @Column({ type: 'int', default: 0 })
  bonusDays: number;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({
    type: 'numeric',
    precision: 4,
    scale: 3,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  discountRate: number;
}

@Entity()
export class PaymentRecruitmentOptions {
  @ManyToOne(() => PaymentRecruitment, (paymentRecruitment) => paymentRecruitment.options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payment_recruitment_id', referencedColumnName: 'id' })
  paymentRecruitment: PaymentRecruitment;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RecruitmentProductOptionName })
  name: RecruitmentProductOptionName;

  @Column({ type: 'enum', enum: RecruitmentDuration })
  duration: RecruitmentDuration;

  @Column({ type: 'int', default: 0 })
  bonusDays: number;

  @Column({ type: 'int', default: 0 })
  maxListUpPerDay: number; // 24시간 내 리스트업 최대 횟수 (기본값: 0)

  @Column({ type: 'int', default: 0 })
  listUpIntervalHours: number; // 리스트업 간 최소 간격 (단위: 시간, 기본값: 0)

  @Column({ type: 'enum', enum: RecruitmentOptionTag, array: true, default: [] })
  tags: RecruitmentOptionTag[];

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  postingStartDate: Date | null;

  @Column({ type: 'timestamptz', precision: 3, nullable: true })
  postingEndDate: Date | null;
}
