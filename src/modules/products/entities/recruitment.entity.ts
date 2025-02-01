import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { RecruitmentProductType, RecruitmentProductName } from '../../../common/constants/product';
import { RecruitmentProductDuration } from './recruitment-duration.entity';
import { RecruitmentProductOption } from './recruitment-option.entity';

@Entity('recruitment_product')
export class RecruitmentProduct {
  @OneToMany(() => RecruitmentProductDuration, (duration) => duration.recruitmentProduct, { cascade: true })
  durations: RecruitmentProductDuration[];

  @OneToMany(() => RecruitmentProductOption, (option) => option.recruitmentProduct, { cascade: true })
  options: RecruitmentProductOption[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RecruitmentProductName })
  name: RecruitmentProductName;

  @Column({ type: 'enum', enum: RecruitmentProductType })
  type: RecruitmentProductType;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
