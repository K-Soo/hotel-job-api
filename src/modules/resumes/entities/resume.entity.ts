import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import {
  ResumeStatus,
  SanctionReason,
  Language,
  Proficiency,
  EducationLevel,
  ResumeType,
  CareerLevel,
} from '../../../common/constants/app.enum';
import { Experience } from '../../experiences/entities/experience.entity';
import { Applicant } from '../../applicants/entities/applicant.entity';
import { Military } from '../../military/entities/military.entity';
import { Condition } from '../../conditions/entities/condition.entity';
import { Application } from '../../applications/entities/application.entity';
import { LicenseDto } from '../dto/license.dto';
@Entity('resume')
export class Resume {
  @OneToMany(() => Application, (application) => application.resume)
  applications: Application[];

  @ManyToOne(() => Applicant, (applicant) => applicant.resumes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicant_id', referencedColumnName: 'id' })
  applicant: Applicant;

  // 근무 조건
  @OneToOne(() => Condition, (condition) => condition.resume, { cascade: true })
  condition: Condition;

  //경력 (필수)
  @OneToMany(() => Experience, (experience) => experience.resume, { cascade: true })
  experience: Experience[];

  //병역사항 (선택)
  @OneToOne(() => Military, (military) => military.resume, { cascade: true })
  military: Military;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  //이력서 노출 여부
  @Column({ type: 'boolean', default: false })
  isVisible: boolean;

  //기본이력서 여부
  @Column({ type: 'boolean', default: false })
  isDefault: boolean;

  //이력서 상태(임시 저장, 제출 완료, 삭제처리 등)
  @Column({ type: 'enum', enum: ResumeStatus, default: ResumeStatus.DRAFT })
  status: ResumeStatus;

  //제제 사유
  @Column({ type: 'enum', enum: SanctionReason, default: SanctionReason.NONE })
  sanctionReason: SanctionReason;

  // ---------- 기본정보(개인정보 수정페이지에서 불러올수있도록?) ------------
  @Column()
  profileImage: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['01', '02'] })
  localCode: '01' | '02';

  @Column({ type: 'enum', enum: ['01', '02'] })
  sexCode: '01' | '02';

  @Column({ default: '' })
  email: string;

  @Column()
  phone: string;

  @Column()
  birthday: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  addressDetail: string;

  //이력서 타입
  @Column({ type: 'enum', enum: ResumeType, default: ResumeType.GENERAL })
  resumeType: ResumeType;

  //이력서 제목 (필수)
  @Column({ type: 'varchar', length: 255 })
  title: string;

  //간략소개 (선택)
  //간략 소개
  @Column({ type: 'varchar', length: 500, nullable: true, default: '' })
  summary: string;

  //경력 구분(신입 or 경력)
  @Column({ type: 'enum', enum: CareerLevel, nullable: true })
  careerLevel: CareerLevel;

  //최종학력 (필수)
  @Column({ type: 'enum', enum: EducationLevel, nullable: true })
  education: EducationLevel;

  //사용가능한 언어 (선택) 다중선택 가능
  @Column({ type: 'json', default: [] })
  languages: { name: Language; level: Proficiency }[];

  //자기소개 (선택)
  @Column({ type: 'text', default: '' })
  introduction: string;

  //경력 기술서 (선택)
  @Column({ type: 'text', default: '' })
  careerDetail: string;

  @Column({ type: 'jsonb', default: [] })
  licenses: LicenseDto[];

  // 포트폴리오 및 기타문서

  // 필수항목 수집 동의
  @Column({ type: 'boolean', default: false })
  isRequiredAgreement: boolean;

  // 선택항목 수집 동의
  @Column({ type: 'boolean', default: false })
  isOptionalAgreement: boolean;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
