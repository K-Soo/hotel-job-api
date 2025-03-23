import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { AccountStatus, Role } from '../../../common/constants/app.enum';

@Entity('account_history')
export class AccountHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  di: string;

  @Column({ type: 'enum', enum: AccountStatus })
  status: AccountStatus;

  @Column({ type: 'enum', enum: Role })
  userRole: Role;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'timestamptz', precision: 0 })
  registeredAt: Date;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;
}
