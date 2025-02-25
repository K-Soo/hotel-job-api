import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('notification_push')
export class Push {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  token: string;

  @Column({ nullable: true })
  os: string; // "macOS", "Android"

  @Column({ nullable: true })
  device: string; //'mobile' | 'tablet' | 'console' | 'smarttv' | 'wearable' | 'xr' | 'embedded';

  @Column({ type: 'boolean', default: true })
  isActivePermission: boolean; //푸시알림 허용여부

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
