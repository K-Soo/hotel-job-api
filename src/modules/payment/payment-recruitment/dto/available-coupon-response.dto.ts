import { IsString } from 'class-validator';

export class AvailableCouponResponseDto {
  @IsString()
  orderId: string;
}
