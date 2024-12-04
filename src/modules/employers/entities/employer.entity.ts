import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRole, ProviderRole } from '../../../common/constants/app.enum';
@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ProviderRole, default: ProviderRole.LOCAL })
  provider: ProviderRole;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYER })
  role: UserRole;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}

function generateRandomUsername(): string {
  const adjectives = ['열정적인', '귀여운', '사랑스런', '활기찬', '배고픈'];
  const nouns = ['호랑이', '하마', '고양이', '강아지', '늑대'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}
