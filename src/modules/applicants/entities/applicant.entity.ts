import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Role, Provider } from '../../../common/constants/app.enum';
import { Consent } from '../../consents/entities/consent.entity';
import { Exclude } from 'class-transformer';
import { Resume } from '../../resumes/entities/resume.entity';
@Entity()
export class Applicant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userId: string;

  @Column({ type: 'enum', enum: Provider })
  provider: Provider;

  @Column({ type: 'enum', enum: Role, default: Role.JOB_SEEKER })
  role: Role;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  @OneToMany(() => Resume, (resumes) => resumes.applicant)
  resumes: Resume[];

  @OneToOne(() => Consent, (consent) => consent.applicant)
  consent: Consent;
}
