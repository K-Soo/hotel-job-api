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
import {
  Role,
  Provider,
  AccountStatus,
  VerificationStatus,
  CertificationStatus,
} from '../../../common/constants/app.enum';
import { Company } from '../company/entities/company.entity';
import { Consent } from '../../consents/entities/consent.entity';
import { Exclude } from 'class-transformer';
import { Certification } from '../../../authentication/certification/entities/certification.entity';
import { Recruitment } from '../recruitment/entities/recruitment.entity';
import { AccountHistory } from '../../../authentication/account-history/entities/account-history.entity';
import { Membership } from '../../membership/entities/membership.entity';
import { EmployerCoupon } from '../../../modules/coupon/entities/employer-coupon.entity';
import { PointTransaction } from '../../point/entities/point-transaction.entity';
import { Notification } from '../../notifications/entities/notification.entity';

function generateRandom10Digit(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

@Entity()
export class Employer {
  @ManyToOne(() => Membership, (membership) => membership.employers)
  membership: Membership;

  @OneToOne(() => Consent, (consent) => consent.employer)
  consent: Consent;

  @OneToOne(() => Company, (company) => company.employer)
  company: Company;

  @OneToOne(() => Certification, (certification) => certification.employer)
  certification: Certification;

  @OneToMany(() => Recruitment, (recruitment) => recruitment.employer)
  recruitment: Recruitment[];

  @OneToMany(() => EmployerCoupon, (employerCoupon) => employerCoupon.employer)
  coupon: EmployerCoupon[];

  @Column({ type: 'enum', enum: CertificationStatus, default: CertificationStatus.UNVERIFIED })
  certificationStatus: CertificationStatus;

  @OneToMany(() => AccountHistory, (accountHistory) => accountHistory.employer)
  accountHistory: AccountHistory[];

  @OneToMany(() => Notification, (notification) => notification.employer)
  notifications: Notification[];

  @OneToMany(() => PointTransaction, (transaction) => transaction.employer)
  pointTransactions: PointTransaction[];

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
    const randomNumber = generateRandom10Digit();
    this.nickname = `${randomNumber}`;
  }

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  passwordChangedAt: Date | null;

  static generateRandom10Digit(): string {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }
}
