import { Controller } from '@nestjs/common';
import { PaymentResumeViewService } from './payment-resume-view.service';

@Controller('payment-resume-view')
export class PaymentResumeViewController {
  constructor(private readonly paymentResumeViewService: PaymentResumeViewService) {}
}
