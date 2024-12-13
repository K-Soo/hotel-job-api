import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Consent } from '../../consents/entities/consent.entity';
import { Role, Provider } from '../../../common/constants/app.enum';
@Entity()
export class Employer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Provider, default: Provider.LOCAL })
  provider: Provider;

  @Column({ type: 'enum', enum: Role, default: Role.EMPLOYER })
  role: Role;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  // @OneToOne(() => Consent, (consent) => consent.employer)
  // consent: Consent;
}

function generateRandomUsername(): string {
  const adjectives = ['열정적인', '귀여운', '사랑스런', '활기찬', '배고픈'];
  const nouns = ['호랑이', '하마', '고양이', '강아지', '늑대'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}
