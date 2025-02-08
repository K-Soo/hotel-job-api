import {
  AfterInsert,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role, Provider, CertificationStatus, AccountStatus } from '../../../common/constants/app.enum';

export interface JobSeekerNotificationSettings {
  jobAlerts: boolean; // 구직 관련 알림
  promoAlerts: boolean; // 프로모션 관련 알림
  systemAlerts: boolean; // 시스템 알림
}

export interface EmployerNotificationSettings {
  applicantAlerts: boolean; // 지원자 관련 알림
  businessUpdates: boolean; // 비즈니스 관련 업데이트
  systemAlerts: boolean; // 시스템 알림
}

@Entity('push')
export class Push {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userUuid: string;

  @Column({ type: 'enum', enum: Provider })
  provider: Provider;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 255 })
  token: string;

  @Column({ nullable: true })
  device: string; // "android", "ios", "web"

  @Column({ nullable: true })
  browser: string; // "Chrome", "Safari"

  @Column({ nullable: true })
  userAgent: string;

  @Column({ type: 'jsonb', nullable: true, default: {} })
  notificationSettings: {
    important: boolean; // 중요 알림 (지원 결과, 메시지, 보안 등)
    system: boolean; // 시스템 알림 (공지, 정책 변경 등)
    marketing: boolean; // 마케팅 및 프로모션 알림
    activity: boolean; // 사용자 활동 관련 알림 (채팅, 팔로우 등)
    business?: boolean; // 사업자 전용 알림 (채용, 결제 등)
  };

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
