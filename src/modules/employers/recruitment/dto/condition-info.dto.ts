import { IsNotEmpty, IsString, IsNumber, IsEnum, IsArray, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SalaryType } from '../../../../common/constants/app.enum';
import { WorkingDay } from '../../../../common/constants/recruitment';
import { Benefits } from '../../../../common/constants/benefits';

export class ConditionInfoDto {
  @ApiProperty({
    description: '고용형태',
    example: { FULL_TIME: true, CONTRACT: false, DAILY_WORKER: false, PART_TIME: false, INTERN: false },
  })
  @Expose()
  @IsNotEmpty()
  employmentType: { FULL_TIME: false; CONTRACT: false; DAILY_WORKER: false; PART_TIME: false; INTERN: false };

  @ApiProperty({ description: '급여 타입', enum: SalaryType, examples: SalaryType })
  @Expose()
  @IsEnum(SalaryType, { message: 'result must be a valid employmentType value' })
  @IsNotEmpty()
  salaryType: SalaryType;

  @ApiProperty({ description: '급여액', example: '100000' })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  salaryAmount: number;

  @ApiProperty({ description: '근무요일', example: WorkingDay.ALTERNATE_2DAY_OFF, required: false })
  @Expose()
  @IsOptional()
  @IsEnum(WorkingDay)
  @IsNotEmpty()
  workingDay: WorkingDay | null;

  @ApiProperty({ description: '근무시간', example: { start: '1010', end: '2020' }, required: false })
  @Expose()
  @IsNotEmpty()
  workingTime: { start: string; end: string };

  @ApiProperty({
    description: '복리후생',
    example: [Benefits.CULTURE_CULTURAL_MEETINGS],
    isArray: true, // Swagger에서 배열로 표시
    enum: Benefits,
    required: false,
  })
  @Expose()
  @IsArray()
  @IsEnum(Benefits, { each: true, message: 'result must be a valid employmentType value' })
  @IsNotEmpty()
  benefits: Benefits[];
}
