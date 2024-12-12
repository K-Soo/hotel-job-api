import { Column, CreateDateColumn, Entity, Generated, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRole, ProviderRole } from '../../../common/constants/app.enum';
import { Consent } from '../../consents/entities/consent.entity';

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

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  @OneToOne(() => Consent, (consent) => consent.applicant)
  consent: Consent;
}
function GeneratedColumn(arg0: string): (target: Applicant, propertyKey: 'uuid') => void {
  throw new Error('Function not implemented.');
}
