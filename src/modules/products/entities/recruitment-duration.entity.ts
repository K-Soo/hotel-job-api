import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RecruitmentProduct } from './recruitment.entity';
import { RecruitmentDuration } from '../../../common/constants/product';
import { Exclude } from 'class-transformer';

@Entity('recruitment_product_duration')
export class RecruitmentProductDuration {
  @ManyToOne(() => RecruitmentProduct, (product) => product.durations, { onDelete: 'CASCADE' })
  recruitmentProduct: RecruitmentProduct;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RecruitmentDuration })
  duration: RecruitmentDuration;

  @Column({ type: 'int', default: 0 })
  bonusDays: number;

  @Column({ type: 'int', default: 0 })
  price: number;

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

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
