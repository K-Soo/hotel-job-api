import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Consent } from '../../consents/entities/consent.entity';
import { Role, Provider, AccountStatus, VerificationStatus } from '../../../common/constants/app.enum';
import { Company } from '../company/entities/company.entity';
import { Exclude } from 'class-transformer';

// 8자리 난수 추가
function generateRandom8Digit(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

@Entity()
export class Employer {
  @OneToOne(() => Consent, (consent) => consent.employer)
  consent: Consent;

  @OneToOne(() => Company, (company) => company.employer)
  company: Company;

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
    const adjectives = ['열정적인', '귀여운', '사랑스러운', '활기찬', '배고픈'];
    const nouns = ['호랑이', '하마', '고양이', '강아지', '늑대'];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = generateRandom8Digit();
    this.nickname = `${randomAdjective}${randomNoun}${randomNumber}`;
  }

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  passwordChangedAt: Date | null;
}
