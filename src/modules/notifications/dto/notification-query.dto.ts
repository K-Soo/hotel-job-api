import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { validationMessage } from '../../../common/utils/regex';

export class NotificationQueryDto {
  @ApiProperty({
    description: '페이지 번호',
    example: 1,
    required: true,
  })
  @IsNumber({}, validationMessage('page'))
  @Min(1, validationMessage('page'))
  @Type(() => Number)
  page: number;

  @ApiProperty({
    description: '한 페이지당 항목 개수',
    example: 10,
    required: true,
  })
  @Type(() => Number)
  @IsNumber({}, validationMessage('limit'))
  @Min(1, validationMessage('limit'))
  limit: number;
}
