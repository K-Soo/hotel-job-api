import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  Index,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Applicant } from '../../applicants/entities/applicant.entity';
import { Employer } from '../../employers/entities/employer.entity';

@Entity()
// @Index(['applicant'], { unique: true })
export class Consent {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'boolean', default: false })
  personalInfoAgree: boolean; //개인정보수집 동의

  @Column({ type: 'boolean', default: false })
  serviceTermsAgree: boolean; //서비스이용약관 동의

  @Column({ type: 'boolean', default: false })
  marketingAgree: boolean; //마케팅 동의

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  // @ManyToOne(() => Employer, (Employer) => Employer.consents, { nullable: true, onDelete: 'CASCADE' })
  // employer: Employer;

  @OneToOne(() => Applicant, (applicant) => applicant.consent, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicantId' })
  applicant: Applicant;
}
