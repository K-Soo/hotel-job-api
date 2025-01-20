import { Module } from '@nestjs/common';
import { PaymentResumeViewService } from './payment-resume-view.service';
import { PaymentResumeViewController } from './payment-resume-view.controller';

@Module({
  controllers: [PaymentResumeViewController],
  providers: [PaymentResumeViewService],
})
export class PaymentResumeViewModule {}
