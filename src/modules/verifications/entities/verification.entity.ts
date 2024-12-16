import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Applicant } from '../../applicants/entities/applicant.entity';
@Entity('verification')
export class Verification {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.verifications, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicant_id', referencedColumnName: 'id' })
  applicant: Applicant;

  // 인증 타입 (예: EMAIL, PHONE 등)
  @Column({ type: 'enum', enum: ['EMAIL', 'PHONE'], nullable: false })
  type: 'EMAIL' | 'PHONE';
}
