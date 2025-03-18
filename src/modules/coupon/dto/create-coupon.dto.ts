import { IsEnum, IsString, IsBoolean, IsNumber } from 'class-validator';
import { DiscountType } from '../../../common/constants/coupon';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty({ description: '수동 발급할 사용자 계정', example: 'kanabun102' })
  @IsString()
  employerUserId: string;

  @ApiProperty({ description: 'secretKey' })
  @IsString()
  secretKey: string;

  @ApiProperty({ description: '쿠폰 코드', example: 'ADMIN_DISCOUNT' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'FIXED: 정액할인', example: DiscountType.FIXED, enum: DiscountType })
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @ApiProperty({ description: '할인율 (ex: 0.1)', example: 0 })
  @IsNumber()
  discountRate: number;

  @ApiProperty({ description: '정액 할인 금액', example: 200000 })
  @IsNumber()
  discountAmount: number;

  @ApiProperty({ description: '최소 주문 금액', example: 0 })
  @IsNumber()
  minOrderAmount: number;

  @ApiProperty({ description: '퍼센트 할인 시 최대 할인 금액 설정 (0이면 무제한)', example: 0 })
  @IsNumber()
  maxDiscountAmount: number;

  @ApiProperty({ description: 'true면 한 번 사용 후 소멸', example: true })
  @IsBoolean()
  isSingleUse: true;

  @ApiProperty({ description: 'true면 모든 사용자에게 발급 가능', example: false })
  @IsBoolean()
  isPublic: false;
}
