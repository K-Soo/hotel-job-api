import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRole, ProviderRole } from '../../../common/constants/app.enum';
import { Consent } from '../../consents/entities/consent.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', unique: true })
  userId: number;

  @Column({ type: 'enum', enum: ProviderRole })
  provider: ProviderRole;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.JOB_SEEKER })
  role: UserRole;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  @OneToOne(() => Consent, (consent) => consent.applicant)
  consent: Consent;
}
