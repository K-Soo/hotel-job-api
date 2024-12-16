import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Resume } from '../../resumes/entities/resume.entity';
import { LicenseStage } from '../../../common/constants/app.enum';

@Entity('license')
@Unique(['resume', 'licenseName'])
export class License {
  @ManyToOne(() => Resume, (resume) => resume.licenses, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resume_id', referencedColumnName: 'id' })
  resume: Resume;

  @PrimaryGeneratedColumn()
  id: number;

  //자격증 이름
  @Column({ type: 'varchar', length: 100 })
  licenseName: string;

  //합격 구분
  @Column({ type: 'enum', enum: LicenseStage })
  licenseStage: LicenseStage;

  // 발급일
  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  dateOfCompletion: Date;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
