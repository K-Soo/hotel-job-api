import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MembershipLevel } from '../../../common/constants/membership';

export class MembershipResponseDto {
  @ApiProperty({ description: 'Min 점수', example: 0 })
  @Expose()
  minScore: number;

  @ApiProperty({ description: 'Max 점수', example: 100000 })
  @Expose()
  maxScore: number;

  @ApiProperty({ description: '할인율', example: 0.1 })
  @Expose()
  discountRate: number;

  @ApiProperty({
    description: '등급',
    enum: MembershipLevel,
    example: MembershipLevel.BRONZE,
  })
  @Expose()
  membershipLevel: MembershipLevel;
}
