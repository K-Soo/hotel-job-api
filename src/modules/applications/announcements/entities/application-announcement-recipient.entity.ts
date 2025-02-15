import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Application } from '../../../applications/entities/application.entity';
import { ApplicationAnnouncement } from './application-announcement.entity';

@Entity('application_announcement_recipient')
export class ApplicationAnnouncementRecipient {
  // 지원자 XXX - set null?
  @ManyToOne(() => Application, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: Application;

  @PrimaryGeneratedColumn()
  id: number;

  // 발표 정보
  @ManyToOne(() => ApplicationAnnouncement, (announcement) => announcement.recipients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'announcement_id' })
  announcement: ApplicationAnnouncement;
}
