import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductType } from '../../../common/constants/product';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // 상품명

  @Column({ type: 'enum', enum: ProductType })
  type: ProductType; // 상품 유형

  @Column({ type: 'numeric', precision: 4, scale: 3 })
  discountRate: number; // 할인율

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}
