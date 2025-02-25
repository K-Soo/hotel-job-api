import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Provider } from '../../../common/constants/app.enum';
import { Applicant } from '../../../modules/applicants/entities/applicant.entity';
import { Employer } from '../../../modules/employers/entities/employer.entity';

export enum NotificationType {
  PUSH = 'PUSH', // 푸시 알림
  EMAIL = 'EMAIL', // 이메일 알림
  IN_APP = 'IN_APP', // 인앱 알림
}

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.notifications, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'applicant_id', referencedColumnName: 'id' })
  applicant: Applicant;

  @ManyToOne(() => Employer, (employer) => employer.notifications, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'employer_id', referencedColumnName: 'id' })
  employer: Employer;

  @Column({ type: 'enum', enum: Provider })
  provider: Provider;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: NotificationType, array: true })
  notificationType: NotificationType[]; // 알림 유형

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
