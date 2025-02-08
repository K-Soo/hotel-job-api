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
import { Resume } from '../../resumes/entities/resume.entity';
import { Jobs, Position } from '../../../common/constants/app.enum';
import { Exclude } from 'class-transformer';

@Entity('experience')
export class Experience {
  @ManyToOne(() => Resume, (resume) => resume.experience, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resume_id', referencedColumnName: 'id' })
  resume: Resume;

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  //회사이름
  @Column({ type: 'varchar', length: 255 })
  companyName: string;

  // 재직 여부
  @Column({ type: 'boolean', default: false })
  isEmployed: boolean;

  // 주요 업무
  @Column({ type: 'text', default: '' })
  responsibility: string;

  // 직무
  @Column({ type: 'enum', enum: Jobs })
  job: Jobs;

  // 직급
  @Column({ type: 'enum', enum: Position, nullable: true })
  position: Position;

  // 입사일
  @Column({ type: 'timestamptz', precision: 0 })
  startDate: Date;

  // 퇴사일 (null이면 재직 중)
  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  endDate: Date | null;

  // 퇴사 사유
  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  reasonForLeaving: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  // @AfterInsert()
  // logInsert() {
  //   console.info('logInsert', this);
  // }
}
