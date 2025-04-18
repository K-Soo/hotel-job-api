import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import { ApplicationStatus, EmployerReviewStageStatus, ReviewStageStatus } from '../../../common/constants/application';
import { Resume } from '../../resumes/entities/resume.entity';
import { Recruitment } from '../../employers/recruitment/entities/recruitment.entity';
import { ApplicationAnnouncementRecipient } from '../announcements/entities/application-announcement-recipient.entity';

@Entity()
export class Application {
  @ManyToOne(() => Resume, (resume) => resume.applications, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'resume_id' })
  resume: Resume | null;

  @ManyToOne(() => Recruitment, (recruitment) => recruitment.applications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recruitment_id' })
  recruitment: Recruitment;

  // 공고 발표
  @OneToMany(() => ApplicationAnnouncementRecipient, (recipient) => recipient.application)
  announcementRecipients: ApplicationAnnouncementRecipient[];

  @PrimaryGeneratedColumn()
  id: number;

  // 지원자 id
  @Column()
  applicantId: string;

  // 이력서의 스냅샷 데이터
  @Column({ type: 'jsonb', nullable: true })
  resumeSnapshot: Record<string, any>;

  // 공고 스냅샷 데이터
  @Column({ type: 'jsonb', nullable: true })
  recruitmentSnapshot: Record<string, any>;

  // 지원 진행 상태 (지원자 측면)
  // 지원 상태
  @Column({ type: 'enum', enum: ApplicationStatus })
  applicationStatus: ApplicationStatus;

  // 전형 단계 (실제 지원자에게 보여지는 단계)
  @Column({ type: 'enum', enum: ReviewStageStatus, default: ReviewStageStatus.DOCUMENT })
  reviewStageStatus: ReviewStageStatus;

  // 고용주(사업자) 측면
  // 사업자 전용 전형 이동 단계
  @Column({ type: 'enum', enum: EmployerReviewStageStatus, default: EmployerReviewStageStatus.DOCUMENT })
  employerReviewStageStatus: EmployerReviewStageStatus;

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
