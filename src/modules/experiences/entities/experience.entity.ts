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
import { Job, Position, SalaryType } from '../../../common/constants/app.enum';
import { City } from '../../../common/constants/location.enum';

@Entity('experience')
export class Experience {
  @ManyToOne(() => Resume, (resume) => resume.experience, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resume_id', referencedColumnName: 'id' })
  resume: Resume;

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
  @Column({ type: 'enum', enum: Job })
  job: Job;

  // 직급
  @Column({ type: 'enum', enum: Position, default: Position.NONE })
  position: Position;

  // 입사일
  @Column({ type: 'timestamptz', precision: 0 })
  startDate: Date;

  // 퇴사일 (null이면 재직 중)
  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  endDate: Date | null;

  // 근무지
  @Column({ type: 'enum', enum: City, default: City.NONE })
  location: City;

  // 퇴사 사유
  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  reasonForLeaving: string;

  // 급여 유형
  @Column({ type: 'enum', enum: SalaryType, default: SalaryType.NONE })
  salaryType: SalaryType;

  //급여 금액
  @Column({ type: 'int', default: 0 })
  baseSalary: number;

  // 수당 금액
  @Column({ type: 'int', default: 0 })
  allowance: number;

  // 총 급여
  @Column({ type: 'int', default: 0 })
  totalSalary: number;

  @BeforeInsert()
  @BeforeUpdate()
  calculateTotalSalary() {
    this.totalSalary = this.baseSalary + this.allowance;
  }

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  @AfterInsert()
  logInsert() {
    console.info('logInsert', this);
  }
}
