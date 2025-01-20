import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Recruitment } from './recruitment.entity';

@Entity('recruitment_nationality')
export class Nationality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  korean: boolean;

  @Column({ default: false })
  foreigner: boolean;

  @Column({ nullable: true, length: 30 })
  marriageVisa: string;

  @OneToOne(() => Recruitment, (recruitment) => recruitment.nationality, { onDelete: 'CASCADE' })
  @JoinColumn()
  recruitment: Recruitment;
}
