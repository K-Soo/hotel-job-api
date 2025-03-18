import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Recruitment } from './recruitment.entity';

@Entity('recruitment_nationality')
export class Nationality {
  @OneToOne(() => Recruitment, (recruitment) => recruitment.nationality, { onDelete: 'CASCADE' })
  @JoinColumn()
  recruitment: Recruitment;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  korean: boolean;

  @Column({ default: false })
  foreigner: boolean;

  @Column({ nullable: true, length: 30 })
  marriageVisa: string;
}
