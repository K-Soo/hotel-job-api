import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentJumpModule } from './payment-jump/payment-jump.module';
import { PaymentRecruitmentModule } from './payment-recruitment/payment-recruitment.module';
import { PaymentResumeViewModule } from './payment-resume-view/payment-resume-view.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), PaymentJumpModule, PaymentRecruitmentModule, PaymentResumeViewModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
