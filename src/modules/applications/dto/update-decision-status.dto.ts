import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDecisionStatusDto {
  @ApiProperty({ description: 'applicationId', example: 1 })
  @IsNumber()
  applicationId: number;
}
