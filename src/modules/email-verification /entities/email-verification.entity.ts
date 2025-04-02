import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class EmailVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: string | null;

  @Column({ nullable: true })
  userName: string | null;

  @Column()
  email: string;

  @Column()
  code: string;

  @Column()
  expiredAt: Date;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  used: boolean;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
