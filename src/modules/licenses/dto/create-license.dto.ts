import { IsDate, IsEnum, Length } from 'class-validator';
import { LicenseStage } from '../../../common/constants/app.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLicenseDto {
  @ApiProperty({ description: '자격증 이름', example: '운전면허 1종 보통' })
  @Length(5, 100)
  licenseName: string;

  @ApiProperty({
    description:
      '합격 구분 (FIRST: 1차 합격, SECOND: 2차 합격, WRITTEN: 필기 합격, PRACTICAL: 실기 합격, FINAL: 최종 합격)',
    example: LicenseStage.FINAL,
    enum: LicenseStage,
  })
  @IsEnum(LicenseStage, { message: 'result must be a valid licenseStage value' })
  licenseStage: LicenseStage;

  @ApiProperty({ description: '취득일', example: '2023-12-15T01:00:00.000Z' })
  @Type(() => Date)
  @IsDate({ message: 'startDate must be a valid ISO 8601 date in UTC format' })
  dateOfCompletion: Date;
}
