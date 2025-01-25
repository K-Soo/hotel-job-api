import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { RecruitmentProductOptionName, RecruitmentOptionTag } from '../../../common/constants/product';
import { RecruitmentProduct } from './recruitment.entity';
import { RecruitmentProductOptionDuration } from './recruitment-option-duration.entity';
import { Exclude } from 'class-transformer';

@Entity('recruitment_product_option')
export class RecruitmentProductOption {
  @ManyToOne(() => RecruitmentProduct, (product) => product.options, { onDelete: 'CASCADE' })
  recruitmentProduct: RecruitmentProduct;

  @OneToMany(() => RecruitmentProductOptionDuration, (optionDuration) => optionDuration.option, { cascade: true })
  optionDurations: RecruitmentProductOptionDuration[]; // 옵션별 기간 가격 목록

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RecruitmentProductOptionName })
  name: RecruitmentProductOptionName;

  @Column({ type: 'int', default: 0 })
  maxListUpPerDay: number; // 24시간 내 리스트업 최대 횟수 (기본값: 0)

  @Column({ type: 'int', default: 0 })
  listUpIntervalHours: number; // 리스트업 간 최소 간격 (단위: 시간, 기본값: 0)

  @Column({ type: 'enum', enum: RecruitmentOptionTag, array: true, default: [] })
  tags: RecruitmentOptionTag[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
