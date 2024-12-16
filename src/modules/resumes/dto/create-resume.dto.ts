import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional, IsArray, ValidateNested, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateExperienceDto } from '../../experiences/dto/create-experience.dto';
import { LanguageDto } from '../dto/language.dto';
import { CreateLicenseDto } from '../../licenses/dto/create-license.dto';
import { CreateMilitaryDto } from '../../military/dto/create-military.dto';
import { EducationLevel, ResumeType } from '../../../common/constants/app.enum';
export class CreateResumeDto {
  @ApiProperty({
    description: '이력서 타입 (FILE: 파일등록, GENERAL: 일반등록)',
    example: ResumeType.GENERAL,
    enum: ResumeType,
  })
  @IsEnum(ResumeType, { message: 'result must be a valid ResumeType value' })
  resumeType: ResumeType;

  @ApiProperty({ description: '이력서 제목', example: '나의 이력서' })
  @Length(5, 255)
  @IsString()
  title: string;

  @ApiProperty({ description: '간략소개', example: '소개글 소개글 소개글' })
  @IsString()
  summary: string;

  @ApiProperty({ description: '최종학력', example: EducationLevel.MIDDLE_SCHOOL, enum: EducationLevel })
  @IsEnum(EducationLevel, { message: 'result must be a valid EducationLevel value' })
  education: EducationLevel;

  @ApiProperty({ description: '졸업여부', example: true })
  @IsBoolean()
  isGraduated: boolean;

  @ApiProperty({
    description: '경력 목록',
    type: [CreateExperienceDto],
    example: [
      {
        companyName: 'ABC Corp',
        job: 'MARKETING',
        isEmployed: false,
        position: 'NONE',
        startDate: '2023-12-15T01:00:00.000Z',
        endDate: null,
        responsibility: '',

        salaryType: 'NONE',
        baseSalary: 0,
        allowance: 0,

        location: '서울특별시',
        reasonForLeaving: '개인적인 이유',
      },
    ],
  })
  @IsArray()
  @Type(() => CreateExperienceDto)
  @ValidateNested({ each: true }) // 배열의 각 요소를 검증
  experiences: CreateExperienceDto[];

  @ApiProperty({
    description: '사용 가능한 언어',
    type: [LanguageDto],
    example: [
      { language: 'ENGLISH', proficiency: 'BEGINNER' },
      { language: 'KOREAN', proficiency: 'BEGINNER' },
    ],
  })
  @IsArray()
  @Type(() => LanguageDto)
  @ValidateNested({ each: true })
  languages: LanguageDto[];

  @ApiProperty({ description: '자기소개', example: '소개글 소개글 소개글' })
  @Length(0, 500, { message: 'introduction must not exceed 500 characters' })
  @IsString()
  introduction: string;

  @ApiProperty({ description: '경력기술서', example: '경력 기술서' })
  @Length(0, 500, { message: 'careerDetail must not exceed 500 characters' })
  @IsString()
  careerDetail: string;

  @ApiProperty({
    description: '자격증',
    type: [CreateLicenseDto],
    example: [
      { licenseName: '운전면허 1종 보통', licenseStage: 'FINAL', dateOfCompletion: '2023-12-15T01:00:00.000Z' },
    ],
  })
  @IsArray()
  @Type(() => CreateLicenseDto)
  @ValidateNested({ each: true })
  licenses: CreateLicenseDto[];

  @ApiProperty({
    description: '병역상태',
    type: CreateMilitaryDto,
    example: {
      militaryStatus: 'NONE',
      reason: 'ㅇㅇㅇ',
      enlistmentDate: null,
      dischargeDate: null,
    },
  })
  @IsOptional()
  @Type(() => CreateMilitaryDto)
  @ValidateNested()
  military?: CreateMilitaryDto;
}
