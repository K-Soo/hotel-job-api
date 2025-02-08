import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employer } from '../../employers/entities/employer.entity';
import { Payment } from '../../payment/entities/payment.entity';
// import { ExchangeItem } from '../../exchange/entities/exchange-item.entity';
import { PointTransactionType } from '../../../common/constants/point';

@Entity('point_transaction')
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employer, (employer) => employer.pointTransactions, { onDelete: 'CASCADE' })
  employer: Employer;

  @ManyToOne(() => Payment, { nullable: true, onDelete: 'SET NULL' })
  payment: Payment | null;

  @Column({ type: 'enum', enum: PointTransactionType })
  type: PointTransactionType; // 적립, 사용, 만료

  @Column({ type: 'int' })
  point: number; // 적립 또는 사용된 포인트

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string | null; // 설명 (예: "결제 적립", "커피 교환", "포인트 만료")

  @Column({ type: 'timestamptz', nullable: true })
  expirationDate: Date | null; // 포인트 만료일 (적립 시에만)

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
