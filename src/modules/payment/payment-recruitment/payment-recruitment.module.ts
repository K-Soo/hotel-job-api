import { Module } from '@nestjs/common';
import { PaymentRecruitmentService } from './payment-recruitment.service';
import { PaymentRecruitmentController } from './payment-recruitment.controller';

@Module({
  controllers: [PaymentRecruitmentController],
  providers: [PaymentRecruitmentService],
})
export class PaymentRecruitmentModule {}
