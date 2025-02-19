import { Type } from 'class-transformer';
import { IsString, IsNumber, Length } from 'class-validator';

export class ConfirmFreeRecruitmentPaymentDto {
  @Length(1, 255, { message: 'must be a valid orderId value' })
  @IsString()
  orderId: string;

  @IsNumber()
  @Type(() => Number)
  amount: number;
}
