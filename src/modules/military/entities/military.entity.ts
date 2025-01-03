import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Resume } from '../../resumes/entities/resume.entity';
import { MilitaryStatus } from '../../../common/constants/app.enum';
import { BadRequestException } from '@nestjs/common';

@Entity('military')
export class Military {
  @OneToOne(() => Resume, (resume) => resume.experience, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resume_id', referencedColumnName: 'id' })
  resume: Resume;

  @PrimaryGeneratedColumn()
  id: number;

  //병역상태
  @Column({ type: 'enum', enum: MilitaryStatus })
  militaryStatus: MilitaryStatus;

  //면제 사유
  @Column({ type: 'varchar', length: '255', default: '' })
  reason: string;

  //입대일
  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  enlistmentDate: Date;

  //제대일
  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  dischargeDate: Date;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  validateMilitaryStatus() {
    // If `reason` is provided but `militaryStatus` is not EXEMPTED, throw an error
    if (this.reason && this.militaryStatus !== MilitaryStatus.EXEMPTED) {
      throw new BadRequestException('Reason is only allowed when militaryStatus is EXEMPTED.');
    }

    // If `militaryStatus` is EXEMPTED but `reason` is not provided, throw an error
    if (this.militaryStatus === MilitaryStatus.EXEMPTED && !this.reason) {
      throw new BadRequestException('Reason is required when militaryStatus is EXEMPTED.');
    }
  }
}
