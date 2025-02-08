import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CleanupPaymentsScheduler } from './cleanup-payments.scheduler';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CleanupPaymentsScheduler],
})
export class SchedulerModule {}
