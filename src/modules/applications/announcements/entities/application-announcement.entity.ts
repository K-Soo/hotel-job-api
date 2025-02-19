import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { AnnouncementType, ResultNotificationStatus } from '../../../../common/constants/application';
import { ApplicationAnnouncementRecipient } from './application-announcement-recipient.entity';
import { Recruitment } from '../../../employers/recruitment/entities/recruitment.entity';

@Entity('application_announcement')
export class ApplicationAnnouncement {
  @OneToMany(() => ApplicationAnnouncementRecipient, (recipient) => recipient.announcement)
  recipients: ApplicationAnnouncementRecipient[];

  // 채용 공고 정보
  @ManyToOne(() => Recruitment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recruitment_id' })
  recruitment: Recruitment;

  @PrimaryGeneratedColumn()
  id: number;

  // 발표 유형 (합격 / 불합격)
  @Column({ type: 'enum', enum: AnnouncementType })
  announcementType: AnnouncementType;

  // // 전형 (서류, 면접, 최종 등)
  // @Column({ type: 'enum', enum: ReviewStageStatus })
  // reviewStage: ReviewStageStatus;

  // // 전형 (서류, 면접, 최종 등)
  @Column({ type: 'enum', enum: ResultNotificationStatus })
  resultNotificationStatus: ResultNotificationStatus;

  // 발표 문구
  @Column({ type: 'text' })
  message: string;

  // 발표명
  @Column({ type: 'varchar', length: 255 })
  title: string;

  // 발표 날짜
  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  announcedAt: Date;

  // 알림 발송 상태 추가
  @Column({ type: 'boolean', default: false })
  isSent: boolean; // 알림이 전송되었는지 여부

  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  sentAt: Date; // 알림이 전송된 시간
}
