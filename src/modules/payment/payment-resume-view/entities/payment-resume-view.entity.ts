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

@Entity()
export class PaymentResumeView {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
