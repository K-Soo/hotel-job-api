import { Controller } from '@nestjs/common';
import { PaymentJumpService } from './payment-jump.service';

@Controller('payment-jump')
export class PaymentJumpController {
  constructor(private readonly paymentJumpService: PaymentJumpService) {}
}
