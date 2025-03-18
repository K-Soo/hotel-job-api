import { IsString, IsDateString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployerCouponDto {
  @ApiProperty({ description: '수동 발급할 사용자 계정', example: 'kanabun102' })
  @IsString()
  employerUserId: string; // 수동 발급할 사용자 ID

  @ApiProperty({ description: '쿠폰 코드', example: 'WELCOME_BASIC_10_DAYS' })
  @IsString()
  couponCode: string;

  @ApiProperty({ description: 'description', example: '2월 VIP 쿠폰' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'expiresAt', example: '2025-02-28T14:59:59.999Z', nullable: true })
  @ValidateIf((o) => o.expiresAt !== '' && o.expiresAt !== null) // 빈 문자열과 null은 무시
  @IsDateString()
  expiresAt: string | null; // 만료일 (선택)

  @ApiProperty({ description: 'secretKey' })
  @IsString()
  secretKey: string;
}
