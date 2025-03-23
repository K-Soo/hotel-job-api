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
export class Consent {
  @OneToOne(() => Employer, (Employer) => Employer.consent, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'employer_id', referencedColumnName: 'id' })
  employer: Employer;

  @OneToOne(() => Applicant, (applicant) => applicant.consent, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'applicant_id', referencedColumnName: 'id' })
  applicant: Applicant;

  @Exclude()
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'boolean', default: false })
  ageAgree: boolean;

  // 개인정보수집 동의
  @Column({ type: 'boolean', default: false })
  personalInfoAgree: boolean;

  // 서비스이용약관 동의
  @Column({ type: 'boolean', default: false })
  serviceTermsAgree: boolean;

  // SMS 수신 동의
  @Column({ type: 'boolean', default: false })
  smsMarketingAgree: boolean;

  //EMAIL 수신 동의
  @Column({ type: 'boolean', default: false })
  emailMarketingAgree: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
