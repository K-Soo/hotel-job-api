import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Role, Provider, ResumeStatus, SanctionReason } from '../../../common/constants/app.enum';
import { Experience } from '../../experiences/entities/experience.entity';
import { Applicant } from '../../applicants/entities/applicant.entity';
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

  @Column()
  applicantId: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.resumes)
  applicant: Applicant;

  //이력서 노출 여부
  @Column({ type: 'boolean', default: false })
  isVisible: boolean;

  //기본이력서 여부
  @Column({ type: 'boolean', default: false })
  isDefault: boolean;

  // 이력서 상태(임시 저장, 제출 완료, 삭제처리 등)
  @Column({ type: 'enum', enum: ResumeStatus, default: ResumeStatus.DRAFT })
  status: ResumeStatus;

  //제제 사유
  @Column({ type: 'enum', enum: SanctionReason, default: SanctionReason.NONE })
  sanctionReason: SanctionReason;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  // ---------- 기본정보(개인정보 수정페이지에서 불러올수있도록?) ------------
  // 이메일
  // 주소
  // 휴대폰
  // 생년월일
  // 성별
  // 프로필 이미지
  // 외국인 여부

  @Column({ type: 'varchar', length: 255 })
  title: string;

  //---------- 간략소개(선택) ------------
  // 간략 소개
  @Column({ type: 'varchar', length: 500, nullable: true, default: '' })
  summary: string;

  // ---------- 경력(필수) ------------ 개별 엔티티로 설계 Resume와 1:N 관계
  // 경력
  // - 필수입력: 회사명, 직무, 직급, 입사일, 퇴사일, 담당업무, 재직여부, 담당업무(2000자 이내)
  // - 선택입력: 근무지, 연봉, 퇴사사유

  @OneToMany(() => Experience, (experience) => experience.resume)
  experiences: Experience[];

  // ---------- 학력(필수) ------------ 개별 엔티티로 분리하여 Resume와 1:N 관계
  // 학력
  // -(학력 구분 선택) - 중졸, 고졸, 대졸, 대학원졸
  // - 필수입력: 학교명, 전공, 학위, 졸업여부
  // - 선택입력: 입학년월, 졸업년월, 지역선택, 검정고시여부
  // ---------- 추가정보(선택) ------------

  //사용가능한 언어(다중선택 가능)
  @Column({ type: 'json', nullable: true, default: [] })
  languageSkills: { language: string; proficiency: 'basic' | 'intermediate' | 'advanced' | 'native' }[];

  //자기소개
  @Column({ type: 'text', nullable: true, default: '' })
  introduction: string;

  //경력 기술서
  @Column({ type: 'text', nullable: true, default: '' })
  careerDetails: string;

  // 자격/어학/수상
  // 취업우대사항(병역,보훈,장애)
  // 포트폴리오 및 기타문서
  // ---------- 근무조건(근무조건 페이지에서 불러올수있도록?) ------------
  // 희망지역
  // 희망연봉 or 급여
  // 희망 직무
  // 고용 형태(정규직, 계약직 등)
}
