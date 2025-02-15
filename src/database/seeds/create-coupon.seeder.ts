import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Coupon } from '../../modules/coupon/entities/coupon.entity';
import { COUPON_SEEDER } from '../../common/constants/seeder';

export default class CreateCouponSeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<void> {
    const couponRepository = dataSource.getRepository(Coupon);

    await couponRepository.upsert(COUPON_SEEDER, ['code']);
  }
}
