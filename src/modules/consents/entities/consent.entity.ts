import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Applicant } from '../../applicants/entities/applicant.entity';
import { Employer } from '../../employers/entities/employer.entity';
import { Exclude } from 'class-transformer';
@Entity()
// @Index(['applicant'], { unique: true })
// @Index(['applicant'], { unique: true })
// @Check(`("applicantId" IS NOT NULL OR "employerId" IS NOT NULL) AND NOT ("applicantId" IS NOT NULL AND "employerId" IS NOT NULL)`)
export class Consent {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'boolean', default: false })
  personalInfoAgree: boolean; //개인정보수집 동의

  @Column({ type: 'boolean', default: false })
  serviceTermsAgree: boolean; //서비스이용약관 동의

  @Column({ type: 'boolean', default: false })
  marketingAgree: boolean; //마케팅 동의

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  // @OneToOne(() => Employer, (Employer) => Employer.consent, { nullable: true, cascade: true })
  // @JoinColumn({ name: 'employerId' })
  // employer: Employer;

  @OneToOne(() => Applicant, (applicant) => applicant.consent, { cascade: true })
  @JoinColumn({ name: 'applicant_id', referencedColumnName: 'id' })
  applicant: Applicant;
}
