import { IsEnum, IsNumber } from 'class-validator';
import { FinalDecisionStatus } from '../../../common/constants/application';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDecisionStatusDto {
  @ApiProperty({ description: 'applicationId', example: 1 })
  @IsNumber()
  applicationId: number;

  @ApiProperty({ description: 'FinalDecisionStatus', example: FinalDecisionStatus.ACCEPT, enum: FinalDecisionStatus })
  @IsEnum(FinalDecisionStatus, { message: 'FinalDecisionStatus must be a valid value' })
  finalDecisionStatus: FinalDecisionStatus;
}
