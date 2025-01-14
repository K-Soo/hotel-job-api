import { Controller } from '@nestjs/common';
import { PaymentRecruitmentService } from './payment-recruitment.service';

@Controller('payment-recruitment')
export class PaymentRecruitmentController {
  constructor(private readonly paymentRecruitmentService: PaymentRecruitmentService) {}
}
