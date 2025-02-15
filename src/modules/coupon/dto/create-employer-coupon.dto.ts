import { IsOptional, IsEnum, IsString, IsUUID, IsDateString, ValidateIf } from 'class-validator';
import { COUPON_CODE_LIST } from '../../../common/constants/coupon';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployerCouponDto {
  @ApiProperty({ description: 'employerId', example: '' })
  @IsUUID()
  employerId: string; // 수동 발급할 사용자 ID

  @ApiProperty({ description: 'couponCode', default: COUPON_CODE_LIST.WELCOME_BASIC_10_DAYS })
  @IsEnum(COUPON_CODE_LIST)
  couponCode: COUPON_CODE_LIST;

  @ApiProperty({ description: 'description', example: '2월 VIP 쿠폰' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'expiresAt', example: '2025-02-28T14:59:59.999Z', nullable: true })
  @ValidateIf((o) => o.expiresAt !== '' && o.expiresAt !== null) // 빈 문자열과 null은 무시
  @IsDateString()
  expiresAt: string | null; // 만료일 (선택)
}
