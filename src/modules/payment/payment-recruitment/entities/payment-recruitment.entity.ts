import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Recruitment } from '../../../employers/recruitment/entities/recruitment.entity';
import { Payment } from '../../entities/payment.entity';

@Entity()
export class PaymentRecruitment {
  @ManyToOne(() => Payment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @ManyToOne(() => Recruitment, (recruit) => recruit.payments)
  @JoinColumn({ name: 'recruit_id' })
  recruitment: Recruitment;

  @PrimaryGeneratedColumn('uuid')
  id: string;
}
