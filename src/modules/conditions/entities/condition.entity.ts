import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Jobs, SalaryType, EmploymentType, Benefits } from '../../../common/constants/app.enum';
import { City, District } from '../../../common/constants/location.enum';
import { Resume } from '../../resumes/entities/resume.entity';

@Entity('condition')
export class Condition {
  @OneToOne(() => Resume, (resume) => resume.condition, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resume_id', referencedColumnName: 'id' })
  resume: Resume;

  @PrimaryGeneratedColumn()
  id: number;

  //직무
  @Column({ type: 'enum', enum: Jobs })
  job: Jobs;

  //고용형태
  @Column({ type: 'enum', enum: EmploymentType })
  employmentType: EmploymentType;

  // 급여 유형
  @Column({ type: 'enum', enum: SalaryType })
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

  // 복리후생 (5개까지)
  @Column({ type: 'enum', enum: Benefits, array: true, default: [] })
  benefit: Benefits[];

  // 희망근무 지역
  @Column({ type: 'json', default: [] })
  location: { city: City; district: District }[];
}
