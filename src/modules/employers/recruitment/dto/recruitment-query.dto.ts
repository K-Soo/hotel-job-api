import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, IsNotEmpty, IsString, Length, ValidateIf, IsEnum } from 'class-validator';
import { RecruitmentQueryStatus, RecruitmentStatus } from '../../../../common/constants/recruitment';
import { Type } from 'class-transformer';
import { regex, validationMessage } from '../../../../common/utils/regex';

export class RecruitmentQueryDto {
  @ApiProperty({
    description: '페이지 번호',
    example: 1,
    required: true,
  })
  @Type(() => Number)
  @IsNumber({}, validationMessage('page'))
  @Min(1, validationMessage('page'))
  @IsNumber()
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

  @ApiProperty({
    description: '공고 상태',
    example: RecruitmentQueryStatus.ALL,
    enum: RecruitmentQueryStatus,
    required: true,
  })
  @IsEnum(RecruitmentQueryStatus, { message: 'Invalid status value provided.' })
  status: RecruitmentQueryStatus;
}
