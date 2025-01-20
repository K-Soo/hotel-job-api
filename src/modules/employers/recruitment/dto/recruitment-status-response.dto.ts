import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RecruitmentStatusResponseDto {
  @ApiProperty({ description: 'Number of recruitments in PROGRESS', example: 0 })
  @Expose()
  PROGRESS: number;

  @ApiProperty({ description: 'Number of recruitments in PENDING', example: 0 })
  @Expose()
  PUBLISHED: number;

  @ApiProperty({ description: 'Number of recruitments in CLOSED', example: 0 })
  @Expose()
  CLOSED: number;

  @ApiProperty({ description: 'Number of recruitments in REVIEWING', example: 0 })
  @Expose()
  REVIEWING: number;

  @ApiProperty({ description: 'Number of recruitments in DRAFT', example: 12 })
  @Expose()
  DRAFT: number;

  @ApiProperty({ description: 'Total number of recruitments across all statuses', example: 12 })
  @Expose()
  ALL: number;
}
