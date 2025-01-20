import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { AccountStatus } from '../../../common/constants/app.enum';
import { Applicant } from '../../../modules/applicants/entities/applicant.entity';
import { Employer } from '../../../modules/employers/entities/employer.entity';

@Entity('account_history')
export class AccountHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.accountHistory, { nullable: true, onDelete: 'SET NULL' })
  applicant: Applicant | null;

  @ManyToOne(() => Employer, (employer) => employer.accountHistory, { nullable: true, onDelete: 'SET NULL' })
  employer: Employer | null;

  @Column({ type: 'enum', enum: AccountStatus })
  status: AccountStatus;

  // 변경 주체 (관리자, 시스템, 사용자 등)
  @Column({ type: 'varchar', nullable: true })
  changedBy: string;

  // 상태 변경 시간
  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  changedAt: Date;

  @Column({ type: 'text', nullable: true })
  note: string;
}
