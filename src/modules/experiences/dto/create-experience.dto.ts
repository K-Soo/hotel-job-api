import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsNumber,
  IsEnum,
  ValidateIf,
  Min,
  Length,
  Max,
} from 'class-validator';
import { Jobs, Position, SalaryType } from '../../../common/constants/app.enum';
import { City } from '../../../common/constants/location.enum';
import { Type } from 'class-transformer';
export class CreateExperienceDto {
  @ApiProperty({ description: '회사명', example: 'ABC Corp' })
  @IsString()
  companyName: string;

  @ApiProperty({ description: '재직중', example: false })
  @IsBoolean()
  isEmployed: boolean;

  @ApiProperty({ description: '주요업무', example: '저의 주요업무는..' })
  @Length(0, 500, { message: 'responsibility must not exceed 500 characters' })
  @IsString()
  responsibility: string;

  @IsEnum(Jobs, { message: 'job must be a valid Job' })
  job: Jobs;

  @IsOptional()
  @IsEnum(Position, { message: 'job must be a valid position' })
  position: Position;

  @ApiProperty({ description: '입사일', example: '2023-12-15T01:00:00.000Z' })
  @Type(() => Date)
  @IsDate({ message: 'startDate must be a valid ISO 8601 date in UTC format' })
  startDate: Date;

  @ValidateIf((obj) => obj.endDate !== null)
  @ApiProperty({ description: '퇴사일 (재직 중인 경우 null)', example: null, nullable: true })
  @Type(() => Date)
  @IsDate({ message: 'startDate must be a valid ISO 8601 date in UTC format' })
  endDate: Date | null;

  @ApiProperty({ description: '퇴사 사유', example: '개인적인이유' })
  @IsString()
  reasonForLeaving: string;
}
