import { Module } from '@nestjs/common';
import { PaymentRecruitmentService } from './payment-recruitment.service';
import { PaymentRecruitmentController } from './payment-recruitment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRecruitment } from './entities/payment-recruitment.entity';
import { Payment } from '../entities/payment.entity';
import { RecruitmentProduct } from '../../products/entities/recruitment.entity';
import { RecruitmentProductOption } from '../../products/entities/recruitment-option.entity';
import { TossModule } from '../../../providers/toss/toss.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentRecruitment, RecruitmentProduct, RecruitmentProductOption]),
    TossModule,
  ],
  controllers: [PaymentRecruitmentController],
  providers: [PaymentRecruitmentService],
})
export class PaymentRecruitmentModule {}
