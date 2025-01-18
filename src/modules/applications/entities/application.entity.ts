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
import { ApplicationStatus, ReviewStageStatus } from '../../../common/constants/application';
import { Role } from '../../../common/constants/app.enum';
import { Resume } from '../../resumes/entities/resume.entity';
import { Recruitment } from '../../employers/recruitment/entities/recruitment.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  // 이력서와의 관계 (참조만 유지)
  @ManyToOne(() => Resume, (resume) => resume.applications, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'resume_id' })
  resume: Resume;

  // 채용공고와의 관계 (참조만 유지)
  @ManyToOne(() => Recruitment, (recruitment) => recruitment.applications, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'recruitment_id' })
  recruitment: Recruitment;

  // 이력서의 스냅샷 데이터 (JSON 저장)
  @Column({ type: 'jsonb', nullable: true })
  resumeSnapshot: Record<string, any>;

  // 지원 상태
  @Column({ type: 'enum', enum: ApplicationStatus })
  applicationStatus: ApplicationStatus;

  // 전형 단계
  @Column({ type: 'enum', enum: ReviewStageStatus, default: ReviewStageStatus.DOCUMENT })
  reviewStageStatus: ReviewStageStatus;

  // 열람 여부
  @Column({ type: 'boolean', default: false })
  isView: boolean;

  //지원일
  @CreateDateColumn({ type: 'timestamptz', precision: 0, nullable: true, default: null })
  applyAt: Date;

  //지원취소일
  @CreateDateColumn({ type: 'timestamptz', precision: 0, nullable: true, default: null })
  cancelAt: Date;

  //합격
  @CreateDateColumn({ type: 'timestamptz', precision: 0, nullable: true, default: null })
  acceptAt: Date;

  //불합격
  @CreateDateColumn({ type: 'timestamptz', precision: 0, nullable: true, default: null })
  rejectAt: Date;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;
}
