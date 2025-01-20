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

@Entity('payment_jump')
export class PaymentJump {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
