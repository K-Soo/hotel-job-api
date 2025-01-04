import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
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
import { License } from '../../licenses/entities/license.entity';
import { Military } from '../../military/entities/military.entity';
import { Condition } from '../../conditions/entities/condition.entity';
@Entity('resume')
@Index('idx_resume_uuid', ['uuid'])
export class Resume {
  // --------- 메모 -------------
  // 이력서는 최대 5개까지 만들 수 있음
  // 이력서 종류 2가지: 파일이력서, 직접 등록
  // - 파일이력서 등록: 필수(이력서파일,학력,총 경력년수), 선택(경력기술서,추가서류 및 첨부파일)
  // - 직접 등록: 아래와같이 입력해서 이력서 등록가능
  // 인재리스트페이지에 렌더링되는 유저는 기본 이력서 + 노출 여부 결합해서 노출 여부 결정
  //
  // 관리 시나리오
  // 1. 정상적인 이력서
  // isActive: true
  // status: 'submitted'
  // 사용자 및 관리자 모두 이력서를 볼 수 있음.
  //
  // 2. 비노출 처리된 이력서
  // isActive: false
  // status: 'hidden'
  // 사유(reasonForHiding): "욕설 포함".
  //
  // 3. 삭제 처리된 이력서
  // isActive: false
  // status: 'deleted'
  // 삭제된 이유와 검토 정보 기록.

  //---------- COMMON ------------
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, default: () => `uuid_generate_v4()` })
  uuid: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.resumes, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicant_id', referencedColumnName: 'id' })
  applicant: Applicant;

  //이력서 노출 여부
  @Column({ type: 'boolean', default: false })
  isVisible: boolean;

  //기본이력서 여부
  @Column({ type: 'boolean', default: false })
  isDefault: boolean;

  //이력서 상태(임시 저장, 제출 완료, 삭제처리 등)
  @Column({ type: 'enum', enum: ResumeStatus, default: ResumeStatus.SUBMITTED })
  status: ResumeStatus;

  //제제 사유
  @Column({ type: 'enum', enum: SanctionReason, default: SanctionReason.NONE })
  sanctionReason: SanctionReason;

  // ---------- 기본정보(개인정보 수정페이지에서 불러올수있도록?) ------------
  // 이메일
  // 주소
  // 휴대폰
  // 생년월일
  // 성별
  // 프로필 이미지
  // 외국인 여부

  //경력 구분(신입 or 경력)
  @Column({ type: 'enum', enum: CareerLevel })
  careerLevel: CareerLevel;

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

  //경력 (필수)
  @OneToMany(() => Experience, (experience) => experience.resume)
  experience: Experience[];

  //최종학력 (필수)
  @Column({ type: 'enum', enum: EducationLevel })
  education: EducationLevel;

  @Column({ type: 'boolean', default: true })
  isGraduated: boolean;

  //사용가능한 언어 (선택) 다중선택 가능
  @Column({ type: 'json', default: [] })
  languages: { language: Language; proficiency: Proficiency }[];

  //자기소개 (선택)
  @Column({ type: 'text', default: '' })
  introduction: string;

  //경력 기술서 (선택)
  @Column({ type: 'text', default: '' })
  careerDetail: string;

  //자격증 (선택)
  @OneToMany(() => License, (license) => license.resume)
  licenses: License[];

  //병역사항 (선택)
  @OneToOne(() => Military, (military) => military.resume)
  military: Military;

  // 포트폴리오 및 기타문서

  // 근무 조건
  @OneToOne(() => Condition, (condition) => condition.resume)
  condition: Condition;

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
