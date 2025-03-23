import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Role, Provider, CertificationStatus, AccountStatus } from '../../../common/constants/app.enum';
import { Consent } from '../../consents/entities/consent.entity';
import { Exclude } from 'class-transformer';
import { Resume } from '../../resumes/entities/resume.entity';
import { Certification } from '../../../authentication/certification/entities/certification.entity';

@Entity('applicant')
export class Applicant {
  @OneToOne(() => Consent, (consent) => consent.applicant, { cascade: true })
  consent: Consent;

  @OneToMany(() => Resume, (resumes) => resumes.applicant, { cascade: true })
  resumes: Resume[];

  @OneToOne(() => Certification, (certification) => certification.applicant, { cascade: true })
  certification: Certification;

  @Column({ type: 'enum', enum: CertificationStatus, default: CertificationStatus.UNVERIFIED })
  certificationStatus: CertificationStatus;

  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //계정상태
  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.ACTIVE })
  accountStatus: AccountStatus;

  @Exclude()
  @Column({ type: 'varchar', unique: true })
  userId: string;

  @Column({ type: 'enum', enum: Provider })
  provider: Provider;

  @Column({ default: null })
  email: string;

  @Exclude()
  @Column({ type: 'enum', enum: Role, default: Role.JOB_SEEKER })
  role: Role;

  @Column({ unique: true })
  nickname: string;

  @BeforeInsert()
  async generateUniqueNickname() {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    this.nickname = `${randomNumber}`;
  }

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
