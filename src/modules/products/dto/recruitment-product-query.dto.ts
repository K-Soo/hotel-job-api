import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RecruitmentProductType } from '../../../common/constants/product';

export class RecruitmentProductQueryDto {
  @ApiProperty({
    description: '상품 타입 (RECRUIT 또는 MAIN)',
    example: 'RECRUIT',
    enum: RecruitmentProductType,
  })
  @IsEnum(RecruitmentProductType, { message: 'type must be RECRUIT or MAIN' })
  type: RecruitmentProductType;
}
