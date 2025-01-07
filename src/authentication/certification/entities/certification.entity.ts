import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CertificationType, CommType } from '../../../common/constants/app.enum';
import { Employer } from '../../../modules/employers/entities/employer.entity';
import { Applicant } from '../../../modules/applicants/entities/applicant.entity';
@Entity('certification')
export class Certification {
  @OneToOne(() => Applicant, (applicant) => applicant.certification, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'applicant_id', referencedColumnName: 'id' })
  applicant: Applicant;

  @OneToOne(() => Employer, (employer) => employer.certification, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'employer_id', referencedColumnName: 'id' })
  employer: Employer;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: CertificationType })
  certificationType: CertificationType;

  @Column()
  birth_day: string; //생년월일 (YYYYMMDD)

  @Column()
  ci: string; //특정 웹사이트가 타 웹사이트와의 제휴 사업을 수행할 경우, 동일 고객을 확인하기 위한 값

  @Column()
  ci_url: string;

  @Column({ type: 'enum', enum: CommType })
  comm_id: CommType;

  @Column()
  di: string; //DI 중복가입 확인값 - 특정 웹 사이트 내에서 중복가입 및 내부회원 관리 시, 동일 고객을 확인하기 위한 값

  @Column()
  di_url: string;

  @Column()
  local_code: '01' | '02'; //내/외국인 정보: 01: 내국인, 02: 외국인

  @Column()
  phone_no: string;

  @Column()
  res_cd: string;

  @Column()
  res_msg: string;

  @Column()
  sex_code: '01' | '02'; //성별 정보: 01: 남성, 02: 여성

  @Column()
  user_name: string;

  @Column()
  web_siteid: string;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
