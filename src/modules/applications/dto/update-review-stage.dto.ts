import { IsEnum, IsNumber } from 'class-validator';
import { ReviewStageStatus } from '../../../common/constants/application';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewStageDto {
  @ApiProperty({ description: 'applicationId', example: 1 })
  @IsNumber()
  applicationId: number;

  @ApiProperty({ description: 'stage', example: ReviewStageStatus.ACCEPT, enum: ReviewStageStatus })
  @IsEnum(ReviewStageStatus, { message: 'ReviewStageStatus must be a valid value' })
  stage: ReviewStageStatus;
}
