import {
  IsNotEmpty,
  IsString,
  Length,
  ValidateIf,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { EducationCondition, ExperienceCondition } from '../../../../common/constants/recruitment';
import { Jobs, Position } from '../../../../common/constants/app.enum';
import { Preferences } from '../../../../common/constants/preferences';

export class NationalityDto {
  @ApiProperty({ description: '내국인 여부', example: true })
  @Expose()
  @IsBoolean()
  korean: boolean;

  @ApiProperty({ description: '외국인 여부', example: true })
  @Expose()
  @IsBoolean()
  foreigner: boolean;

  @ApiProperty({ description: '비자 조건', example: 'H-2, F-2' })
  @Expose()
  @IsString()
  @ValidateIf((obj) => obj.foreigner === true) // 외국인일 경우만 필수
  @IsNotEmpty({ message: 'Marriage visa must be provided for foreigner.' })
  @Length(2, 30, { message: 'Marriage visa must be between 2 and 30 characters.' })
  marriageVisa: string;
}

export class RecruitmentInfoDto {
  @ApiProperty({
    description: '직무',
    example: [Jobs.ADMIN_SUPPORT, Jobs.IT_SUPPORT],
    isArray: true, // Swagger에서 배열로 표시
    enum: Jobs,
  })
  @Expose()
  @IsArray()
  @IsEnum(Jobs, { each: true }) // 배열 내 각 값이 열거형인지 확인
  jobs: Jobs[];

  @ApiProperty({ description: '경력', example: ExperienceCondition.NOT_REQUIRED })
  @IsOptional()
  @Expose()
  @IsEnum(ExperienceCondition)
  experienceCondition: ExperienceCondition;

  @ApiProperty({ description: '국적 정보', type: NationalityDto })
  @Expose()
  @Type(() => NationalityDto)
  @IsNotEmpty()
  nationality: NationalityDto;

  @ApiProperty({ description: '모집 인원', example: 1 })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  recruitmentCapacity: number;

  @ApiProperty({ description: '학력 조건', example: EducationCondition.NOT_REQUIRED })
  @Expose()
  @IsEnum(EducationCondition)
  educationCondition: EducationCondition;

  @ApiProperty({ description: '근무 부서', example: '객실팀' })
  @Expose()
  @ValidateIf((obj) => obj.department !== '')
  @Length(2, 30)
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({ description: '직급', example: Position.EXECUTIVE, enum: Position })
  @IsOptional()
  @Expose()
  @IsEnum(Position)
  position: Position;

  @ApiProperty({
    description: '필수/우대사항',
    example: [Preferences.ACCOUNTING_EXPERT, Preferences.ALTERNATE_SHIFT],
    isArray: true,
    enum: Preferences,
  })
  @Expose()
  @IsArray()
  @IsEnum(Preferences, { each: true })
  preferences: Preferences[];
}
