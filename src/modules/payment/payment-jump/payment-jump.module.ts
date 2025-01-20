import { Module } from '@nestjs/common';
import { PaymentJumpService } from './payment-jump.service';
import { PaymentJumpController } from './payment-jump.controller';

@Module({
  controllers: [PaymentJumpController],
  providers: [PaymentJumpService],
})
export class PaymentJumpModule {}
