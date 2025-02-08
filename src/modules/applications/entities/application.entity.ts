import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ApplicationStatus, ReviewStageStatus, FinalDecisionStatus } from '../../../common/constants/application';
import { Resume } from '../../resumes/entities/resume.entity';
import { Recruitment } from '../../employers/recruitment/entities/recruitment.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  // 이력서와의 관계 (참조만 유지)
  @ManyToOne(() => Resume, (resume) => resume.applications, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'resume_id' })
  resume: Resume | null;

  // 이력서의 스냅샷 데이터
  @Column({ type: 'jsonb', nullable: true })
  resumeSnapshot: Record<string, any>;

  // 채용공고와의 관계 (참조만 유지)
  @ManyToOne(() => Recruitment, (recruitment) => recruitment.applications, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'recruitment_id' })
  recruitment: Recruitment | null;

  // 공고 스냅샷 데이터
  @Column({ type: 'jsonb', nullable: true })
  recruitmentSnapshot: Record<string, any>;

  // 지원 상태
  @Column({ type: 'enum', enum: ApplicationStatus })
  applicationStatus: ApplicationStatus;

  @Column({ type: 'enum', enum: FinalDecisionStatus, default: FinalDecisionStatus.PENDING })
  finalDecisionStatus: FinalDecisionStatus | null;

  // 전형 단계 (실제 지원자에게 보여지는 단계)
  @Column({ type: 'enum', enum: ReviewStageStatus, default: ReviewStageStatus.DOCUMENT })
  reviewStageStatus: ReviewStageStatus;

  // 사업자 전용 전형 이동 단계
  @Column({ type: 'enum', enum: ReviewStageStatus, default: ReviewStageStatus.DOCUMENT })
  employerReviewStageStatus: ReviewStageStatus;

  // **********************************************
  // 열람 여부
  @Column({ type: 'boolean', default: false })
  isView: boolean;

  // 열람일
  @Column({ type: 'timestamptz', precision: 0, nullable: true, default: null })
  viewAt: Date;

  // **********************************************
  // 지원 날짜
  @Column({ type: 'timestamptz', precision: 0, nullable: true, default: null })
  applyAt: Date;

  // 지원취소 날짜
  @Column({ type: 'timestamptz', precision: 0, nullable: true, default: null })
  cancelAt: Date;

  // ***********************************************
  // 합격 날짜
  @Column({ type: 'timestamptz', precision: 0, nullable: true, default: null })
  acceptAt: Date;

  // 불합격 날짜
  @Column({ type: 'timestamptz', precision: 0, nullable: true, default: null })
  rejectAt: Date;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;
}
