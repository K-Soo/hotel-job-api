import { AfterInsert, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Resume } from '../../resumes/entities/resume.entity';
import { Job, Position, SalaryType } from '../../../common/constants/app.enum';

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Resume, (resume) => resume.experiences, { cascade: true })
  resume: Resume;

  // 재직 여부
  @Column({ type: 'boolean', default: false })
  isEmployed: boolean;

  //회사이름
  @Column({ type: 'varchar', length: 255 })
  companyName: string;

  //직무
  @Column({ type: 'enum', enum: Job })
  job: Job;

  //직급
  @Column({ type: 'enum', enum: Position })
  position: Position;

  // 입사일
  @Column({ type: 'timestamptz', precision: 0 })
  startDate: Date;

  // 퇴사일 (null이면 재직 중)
  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  endDate: Date | null;

  // 근무지
  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  location?: string;

  // 퇴사 사유
  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  reasonForLeaving?: string;

  //급여 유형
  @Column({ type: 'enum', enum: SalaryType, default: SalaryType.NONE })
  salaryType: SalaryType;

  // 급여 금액
  @Column({ type: 'int', default: 0 })
  salaryAmount: number;

  // 수당 금액
  @Column({ type: 'int', default: 0 })
  allowance: number;

  //총 급여
  @Column({ type: 'int', default: 0 })
  totalSalary: number;

  @BeforeInsert()
  @BeforeUpdate()
  calculateTotalSalary() {
    this.totalSalary = this.salaryAmount + this.allowance;
  }

  @AfterInsert()
  logInsert() {
    console.info('logInsert', this);
  }
}
