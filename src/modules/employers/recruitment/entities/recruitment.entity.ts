import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  AfterUpdate,
  BeforeUpdate,
  AfterInsert,
} from 'typeorm';
import {
  EducationCondition,
  ExperienceCondition,
  RecruitmentStatus,
  WorkingDay,
} from '../../../../common/constants/recruitment';
import { Jobs, Position, SalaryType } from '../../../../common/constants/app.enum';
import { Employer } from '../../entities/employer.entity';
import { Nationality } from './nationality.entity';
import { Benefits } from '../../../../common/constants/benefits';
import { Preferences } from '../../../../common/constants/preferences';
import { PaymentRecruitment } from '../../../payment/payment-recruitment/entities/payment-recruitment.entity';
import { Application } from '../../../applications/entities/application.entity';
@Entity()
export class Recruitment {
  // 채용 테이블
  @OneToMany(() => Application, (application) => application.recruitment)
  applications: Application[];

  @ManyToOne(() => Employer, (employer) => employer.recruitment, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employer_id', referencedColumnName: 'id' })
  employer: Employer;

  @OneToMany(() => PaymentRecruitment, (payment) => payment.recruitment)
  paymentRecruitment: PaymentRecruitment[];

  @OneToOne(() => Nationality, (nationality) => nationality.recruitment, { cascade: true })
  nationality: Nationality;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recruitmentTitle: string;

  @Column({ type: 'enum', enum: RecruitmentStatus })
  recruitmentStatus: RecruitmentStatus;

  // group
  @Column({ type: 'enum', enum: Jobs, array: true, nullable: true })
  jobs: Jobs[];

  @Column({ type: 'enum', enum: ExperienceCondition, nullable: true })
  experienceCondition: ExperienceCondition;

  @Column({ type: 'enum', enum: EducationCondition, default: EducationCondition.NOT_REQUIRED })
  educationCondition: EducationCondition;

  @Column()
  recruitmentCapacity: number;

  @Column({ default: '' })
  department: string;

  @Column({ type: 'enum', enum: Position, nullable: true })
  position: Position;

  @Column({ type: 'enum', enum: Preferences, default: [], array: true })
  preferences: Preferences[];

  // group
  @Column({ type: 'text' })
  content: string;

  // group
  @Column({
    type: 'jsonb',
    default: { FULL_TIME: false, CONTRACT: false, DAILY_WORKER: false, PART_TIME: false, INTERN: false },
  })
  employmentType: { FULL_TIME: false; CONTRACT: false; DAILY_WORKER: false; PART_TIME: false; INTERN: false };

  @Column({ type: 'enum', enum: SalaryType, default: SalaryType.MONTHLY })
  salaryType: SalaryType;

  @Column({ default: 0 })
  salaryAmount: number;

  @Column({ type: 'enum', enum: WorkingDay, default: null, nullable: true })
  workingDay: WorkingDay;

  @Column({
    type: 'jsonb',
    default: { start: '', end: '' },
  })
  workingTime: { start: string; end: string };

  @Column({ type: 'enum', enum: Benefits, default: [], array: true })
  benefits: Benefits[];

  // group
  @Column({ default: '' })
  hotelName: string;

  @Column({ default: 0 })
  roomCount: number;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  addressDetail: string;

  // group
  @Column({ default: '' })
  managerName: string;

  @Column({ default: false })
  isNamePrivate: boolean;

  @Column({ default: '' })
  managerNumber: string;

  @Column({ default: false })
  isNumberPrivate: boolean;

  @Column({ default: '' })
  managerEmail: string;

  @Column({ default: false })
  isEmailPrivate: boolean;

  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  postingStartDate: Date | null;

  @Column({ type: 'timestamptz', precision: 3, nullable: true })
  postingEndDate: Date | null;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  // 업데이트 전
  @BeforeUpdate()
  logBeforeUpdate() {
    console.log('✏️ [BeforeUpdate] 채용공고 업데이트 전:');
    console.log(`ID: ${this.id}`);
    console.log(`시작일: ${this.postingStartDate}`);
    console.log(`마감일: ${this.postingEndDate}`);
  }

  // 저장 후
  @AfterInsert()
  logAfterInsert() {
    console.log('✅ [AfterInsert] 채용공고 저장 완료:');
    console.log(`ID: ${this.id}`);
    console.log(`저장된 시작일: ${this.postingStartDate}`);
    console.log(`저장된 마감일: ${this.postingEndDate}`);
  }

  // 업데이트 후
  @AfterUpdate()
  logAfterUpdate() {
    console.log('🔄 [AfterUpdate] 채용공고 업데이트 완료:');
    console.log(`ID: ${this.id}`);
    console.log(`업데이트된 시작일: ${this.postingStartDate}`);
    console.log(`업데이트된 마감일: ${this.postingEndDate}`);
  }
}
