import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { EmployerCoupon } from './entities/employer-coupon.entity';
import { Employer } from '../../modules/employers/entities/employer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, EmployerCoupon, Employer])],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
