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
import { User } from '../../users/entities/user.entity';
@Entity('applicant')
export class Applicant {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column({ unique: true })
  userId: string;

  @Column({ type: 'enum', enum: Provider })
  provider: Provider;

  @Exclude()
  @Column({ type: 'enum', enum: Role, default: Role.JOB_SEEKER })
  role: Role;

  @OneToMany(() => Resume, (resumes) => resumes.applicant)
  resumes: Resume[];

  @OneToOne(() => Consent, (consent) => consent.applicant)
  consent: Consent;

  @OneToOne(() => User, (user) => user.applicant)
  user: User;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
