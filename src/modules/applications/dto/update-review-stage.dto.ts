import { IsEnum, IsNumber } from 'class-validator';
import { EmployerReviewStageStatus } from '../../../common/constants/application';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewStageDto {
  @ApiProperty({ description: 'applicationId', example: 1 })
  @IsNumber()
  applicationId: number;

  @ApiProperty({ description: 'stage', example: EmployerReviewStageStatus.ACCEPT, enum: EmployerReviewStageStatus })
  @IsEnum(EmployerReviewStageStatus, { message: 'EmployerReviewStageStatus must be a valid value' })
  stage: EmployerReviewStageStatus;
}
