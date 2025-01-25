import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RecruitmentProductOption } from './recruitment-option.entity';
import { RecruitmentDuration } from '../../../common/constants/product';
import { Exclude } from 'class-transformer';

@Entity('recruitment_product_option_duration')
export class RecruitmentProductOptionDuration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RecruitmentProductOption, (option) => option.optionDurations, { onDelete: 'CASCADE' })
  option: RecruitmentProductOption;

  @Column({ type: 'enum', enum: RecruitmentDuration })
  duration: RecruitmentDuration;

  @Column({
    type: 'numeric',
    precision: 4,
    scale: 3,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  discountRate: number;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
