import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PaymentsScheduler } from './payments.scheduler';
import { CouponScheduler } from './coupon.scheduler';
import { RecruitmentScheduler } from './recruitment.scheduler';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [PaymentsScheduler, CouponScheduler, RecruitmentScheduler],
})
export class SchedulerModule {}
