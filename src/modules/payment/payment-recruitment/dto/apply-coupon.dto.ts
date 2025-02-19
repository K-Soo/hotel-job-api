import { IsString, IsUUID } from 'class-validator';

export class ApplyCouponDto {
  @IsUUID()
  couponId: string;

  @IsString()
  orderId: string;
}
