import { Company } from '../company/entities/company.entity';
import { Consent } from '../../consents/entities/consent.entity';
import { Exclude } from 'class-transformer';
import { Certification } from '../../../authentication/certification/entities/certification.entity';
import { Recruitment } from '../recruitment/entities/recruitment.entity';
import { AccountHistory } from '../../../authentication/account-history/entities/account-history.entity';
import { Membership } from '../../membership/entities/membership.entity';
import { EmployerCoupon } from '../../../modules/coupon/entities/employer-coupon.entity';
import { PointTransaction } from '../../point/entities/point-transaction.entity';
import {
  Role,
  Provider,
  AccountStatus,
  VerificationStatus,
  CertificationStatus,
} from '../../../common/constants/app.enum';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Employer {
  @OneToOne(() => Certification, (certification) => certification.employer)
  certification: Certification;

  @OneToMany(() => Recruitment, (recruitment) => recruitment.employer, { cascade: true })
  recruitment: Recruitment[];

  @ManyToOne(() => Membership, (membership) => membership.employers, { cascade: true })
  membership: Membership;

  @OneToOne(() => Consent, (consent) => consent.employer, { cascade: true })
  consent: Consent;

  @OneToOne(() => Company, (company) => company.employer, { cascade: true })
  company: Company;

  @OneToMany(() => EmployerCoupon, (employerCoupon) => employerCoupon.employer)
  coupon: EmployerCoupon[];

  @OneToMany(() => PointTransaction, (transaction) => transaction.employer)
  pointTransactions: PointTransaction[];

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

  @Column({ type: 'int', default: 0 })
  totalScore: number; //현재 맴버십 보유 점수

  @Column({ type: 'int', default: 0 })
  totalPoint: number; // 현재 보유 포인트

  @BeforeInsert()
  async generateUniqueNickname() {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    this.nickname = `${randomNumber}`;
  }

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  passwordChangedAt: Date | null;
}
