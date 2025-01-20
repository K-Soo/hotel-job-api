import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyResumeDto {
  @ApiProperty({ description: '이력서 ID', example: '1234' })
  @IsString()
  resumeId: string;

  @ApiProperty({ description: '공고 ID', example: '1234' })
  @IsString()
  recruitId: string;
}
