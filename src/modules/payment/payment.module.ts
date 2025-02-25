import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentRecruitmentModule } from './payment-recruitment/payment-recruitment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), PaymentRecruitmentModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
