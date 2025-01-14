import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Consent } from '../../consents/entities/consent.entity';
import {
  Role,
  Provider,
  AccountStatus,
  VerificationStatus,
  CertificationStatus,
} from '../../../common/constants/app.enum';
import { Company } from '../company/entities/company.entity';
import { Exclude } from 'class-transformer';
import { Certification } from '../../../authentication/certification/entities/certification.entity';
import { Recruitment } from '../recruitment/entities/recruitment.entity';

function generateRandom10Digit(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

@Entity()
export class Employer {
  @OneToOne(() => Consent, (consent) => consent.employer)
  consent: Consent;

  @OneToOne(() => Company, (company) => company.employer)
  company: Company;

  @OneToOne(() => Certification, (certification) => certification.employer)
  certification: Certification;

  @OneToMany(() => Recruitment, (recruitment) => recruitment.employer)
  recruitment: Recruitment[];

  //본인인증
  @Column({ type: 'enum', enum: CertificationStatus, default: CertificationStatus.UNVERIFIED })
  certificationStatus: CertificationStatus;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: Provider, default: Provider.LOCAL })
  provider: Provider;

  @Column({ type: 'enum', enum: Role, default: Role.EMPLOYER })
  role: Role;

  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.ACTIVE })
  accountStatus: AccountStatus;

  @Column({ type: 'enum', enum: VerificationStatus, default: VerificationStatus.NOT_REQUESTED })
  companyVerificationStatus: VerificationStatus;

  @Column({ unique: true })
  nickname: string;

  @BeforeInsert()
  async generateUniqueNickname() {
    const randomNumber = generateRandom10Digit();
    this.nickname = `${randomNumber}`;
  }

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  passwordChangedAt: Date | null;
}
