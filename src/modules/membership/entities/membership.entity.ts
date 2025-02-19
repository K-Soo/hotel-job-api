import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { MembershipLevel } from '../../../common/constants/membership';
import { Employer } from '../../employers/entities/employer.entity';

@Entity()
export class Membership {
  @OneToMany(() => Employer, (employer) => employer.membership)
  employers: Employer[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MembershipLevel, unique: true, default: MembershipLevel.FAMILY })
  membershipLevel: MembershipLevel;

  @Column({
    type: 'numeric',
    precision: 4,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  discountRate: number;

  @Column({ type: 'bigint', default: 0 })
  minScore: number;

  @Column({ type: 'bigint' })
  maxScore: number;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
