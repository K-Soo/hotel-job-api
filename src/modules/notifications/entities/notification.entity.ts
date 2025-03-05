import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryType, NotificationType } from '../../../common/constants/notification';
@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  userIds: string[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  readByUserIds: string[]; // 알림을 읽은 사용자 목록

  // @Column({ type: 'enum', enum: Provider })
  // provider: Provider;

  @Column({ type: 'enum', enum: CategoryType })
  category: CategoryType;

  @Column({ type: 'varchar', length: 255, default: '' })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ default: '' })
  link: string;

  @Column({ type: 'enum', enum: NotificationType, array: true })
  notificationType: NotificationType[]; // 알림 유형

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;
}
