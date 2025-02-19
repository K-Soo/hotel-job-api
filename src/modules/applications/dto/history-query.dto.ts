import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { validationMessage } from '../../../common/utils/regex';
import { ReviewStageStatus } from 'src/common/constants/application';

export class HistoryQueryDto {
  @ApiProperty({
    description: '상태',
    type: String,
    enum: ReviewStageStatus,
    example: ReviewStageStatus.ACCEPT,
    required: false,
  })
  @IsEnum(ReviewStageStatus, validationMessage('status'))
  @IsOptional()
  status?: ReviewStageStatus;
}
