import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRole, ProviderRole } from '../../../common/constants/app.enum';

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ type: 'bigint' })
  userId: number;

  @Column({ type: 'enum', enum: ProviderRole })
  provider: ProviderRole;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.JOB_SEEKER })
  role: UserRole;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
