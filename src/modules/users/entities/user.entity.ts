import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { Applicant } from '../../applicants/entities/applicant.entity';
import { Gender } from '../../../common/constants/app.enum';

@Entity('user')
export class User {
  @OneToOne(() => Applicant, (applicant) => applicant.user, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicant_id', referencedColumnName: 'id' })
  applicant: Applicant;

  @PrimaryGeneratedColumn()
  id: number;

  // 이름
  @Column({ type: 'varchar', length: 50, default: '' })
  name: string;

  // 성별
  @Column({ type: 'enum', enum: Gender, default: Gender.NONE })
  gender: Gender;

  // 생년월일
  @Column({ type: 'timestamptz', nullable: true, precision: 0 })
  dateOfBirth: Date;

  @Column({ default: '' })
  profileImage: string;

  // 이메일
  @Column({ type: 'varchar', length: 255, default: '' })
  email: string;

  // 이메일 인증 여부
  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  // 이메일 인증 코드
  @Column({ type: 'varchar', length: 255, nullable: true })
  emailVerificationCode: string;

  // 휴대폰
  @Column({ type: 'varchar', length: 11, default: '' })
  phone: string;

  // 해외 휴대폰
  @Column({ type: 'boolean', default: false })
  isOverseasPhone: boolean;

  // 휴대폰 인증 코드
  @Column({ type: 'varchar', length: 255, nullable: true })
  phoneVerificationCode: string;

  // 기본 주소
  @Column({ type: 'varchar', length: 255, default: '' })
  address: string;

  // 상세주소
  @Column({ type: 'varchar', length: 255, default: '' })
  addressDetail: string;

  // 해외 지역
  @Column({ type: 'boolean', default: false })
  isOverseasResident: boolean;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
