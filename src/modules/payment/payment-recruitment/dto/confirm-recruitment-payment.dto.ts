import { Type } from 'class-transformer';
import { IsString, IsNumber, Min, Length } from 'class-validator';

export class ConfirmRecruitmentPaymentDto {
  @Length(1, 255, { message: 'must be a valid orderId value' })
  @IsString()
  orderId: string;

  @Length(1, 255, { message: 'must be a valid paymentKey value' })
  @IsString()
  paymentKey: string;

  @IsNumber()
  @Min(5000, { message: 'must be a valid amount value' })
  @Type(() => Number)
  amount: number;
}
