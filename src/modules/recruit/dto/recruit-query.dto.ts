import { ApiProperty, ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';
import { IsNumber, Min, IsEnum, IsArray, IsOptional, ArrayUnique } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { validationMessage } from '../../../common/utils/regex';
import { ExperienceCondition } from '../../../common/constants/recruitment';
import { Benefits } from '../../../common/constants/benefits';
import { EmploymentType, Jobs } from '../../../common/constants/app.enum';
import { ArrayMaxSize } from 'class-validator';

export class RecruitQueryDto {
  @ApiProperty({
    description: '페이지 번호',
    example: 1,
    required: true,
  })
  @IsNumber({}, validationMessage('page'))
  @Min(1, validationMessage('page'))
  @IsNumber({}, validationMessage('page'))
  @Type(() => Number)
  page: number;

  @ApiProperty({
    description: '한 페이지당 항목 개수',
    example: 10,
    required: true,
  })
  @Type(() => Number)
  @IsNumber({}, validationMessage('limit'))
  @Min(1, validationMessage('limit'))
  limit: number;

  @ApiProperty({
    required: false,
    description: '경력/신입',
    type: String,
    enum: ExperienceCondition,
    example: ExperienceCondition.NOT_REQUIRED,
  })
  @IsOptional()
  @IsEnum(ExperienceCondition, validationMessage('experience'))
  experience?: ExperienceCondition;

  @ApiPropertyOptional({
    required: false,
    description: '고용형태',
    enum: EmploymentType,
    isArray: true,
    example: [EmploymentType.CONTRACT, EmploymentType.PART_TIME],
  })
  @IsOptional()
  @IsArray({ message: 'employment must be an array.' })
  @ArrayUnique({ message: 'employment must not contain duplicate values.' })
  @IsEnum(EmploymentType, { each: true, message: 'Invalid employment value provided.' })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value])) //배열 or 단일 검증
  employment?: EmploymentType[];

  @ApiPropertyOptional({
    required: false,
    description: '직무',
    type: [String],
    enum: Jobs,
    isArray: true,
    // example: [Jobs.ADMIN_SUPPORT, Jobs.BARTENDER],
    example: [Jobs.ADMIN_SUPPORT],
  })
  // @ArrayMaxSize(3, { message: 'You can select up to 3 Jobs only.' })
  @IsOptional()
  @IsArray({ message: 'Jobs must be an array.' })
  @ArrayUnique({ message: 'Jobs must not contain duplicate values.' })
  @IsEnum(Jobs, { each: true, message: 'Invalid Jobs value provided.' })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  jobs?: Jobs[];

  // 복리후생 (5개까지)
  @ApiPropertyOptional({
    required: false,
    description: '복리후생',
    type: [String],
    enum: Benefits,
    isArray: true,
    example: [Benefits.CULTURE_CULTURAL_MEETINGS],
  })
  @ArrayMaxSize(5, { message: 'You can select up to 5 benefits only.' })
  @IsOptional()
  @IsArray({ message: 'benefits must be an array.' })
  @ArrayUnique({ message: 'benefits must not contain duplicate values.' })
  @IsEnum(Benefits, { each: true, message: 'Invalid benefits value provided.' })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  benefits?: Benefits[];

  // @ApiPropertyOptional({
  //   required: false,
  //   description: '고용형태',
  //   type: 'array',
  //   items: {
  //     type: 'string',
  //     enum: Object.entries(EmploymentType).map(([key, value]) => `${key} (${value})`),
  //   },
  //   example: ['CONTRACT (계약직)', 'PART_TIME (파트타임)'],
  // })
}
