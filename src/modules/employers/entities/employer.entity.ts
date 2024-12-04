import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'local' })
  provider: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

function generateRandomUsername(): string {
  const adjectives = ['열정적인', '귀여운', '사랑스런', '활기찬', '배고픈'];
  const nouns = ['호랑이', '하마', '고양이', '강아지', '늑대'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}
