import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional, IsArray, ValidateNested, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateExperienceDto } from '../../experiences/dto/create-experience.dto';
import { LanguageDto } from '../dto/language.dto';
import { CreateMilitaryDto } from '../../military/dto/create-military.dto';
import { EducationLevel, ResumeType, CareerLevel, LocalCode, SexCode } from '../../../common/constants/app.enum';
import { IsTrue } from '../../../common/validations/is-true.decorator';
import { LicenseDto } from './license.dto';

export class PublishResumeDto {
  @ApiProperty({ description: '이력서 id' })
  @IsString()
  id: string;

  @ApiProperty({
    description: '이력서 타입 (FILE: 파일등록, GENERAL: 일반등록)',
    example: ResumeType.GENERAL,
    enum: ResumeType,
  })
  @IsEnum(ResumeType, { message: 'result must be a valid ResumeType value' })
  resumeType: ResumeType;

  @ApiProperty({
    description: '경력 구분 (NEWBIE: 신입, EXPERIENCED: 경력)',
    example: CareerLevel.NEWBIE,
    enum: CareerLevel,
  })
  @IsEnum(CareerLevel, { message: 'result must be a valid CareerLevel value' })
  careerLevel: CareerLevel;

  @ApiProperty({ description: '이력서 제목', example: '나의 이력서' })
  @Length(5, 30)
  @IsString()
  title: string;

  @ApiProperty({ description: '프로필이미지', example: 'url' })
  @IsString()
  profileImage: string;

  @ApiProperty({ description: '내, 외국인 코드', example: LocalCode.DOMESTIC, enum: LocalCode })
  @IsEnum(LocalCode)
  localCode: LocalCode;

  @ApiProperty({ description: '셩별 코드', example: SexCode.MALE, enum: SexCode })
  @IsEnum(SexCode)
  sexCode: SexCode;

  @ApiProperty({ description: '이름', example: '홍길동' })
  @Length(2, 20)
  @IsString()
  name: string;

  @ApiProperty({ description: '휴대폰', example: '01012341234' })
  @Length(11, 11)
  @IsString()
  phone: string;

  @ApiProperty({ description: '생년월일', example: '19911010' })
  @Length(8, 8)
  @IsString()
  birthday: string;

  @ApiProperty({ description: '주소', example: '경기도 성남시' })
  @Length(5, 40)
  @IsString()
  address: string;

  @ApiProperty({ description: '주소 상세', example: '2호' })
  @Length(2, 40)
  @IsString()
  addressDetail: string;

  @ApiProperty({ description: '이메일', example: 'asdsad@naver.com' })
  @IsString()
  email: string;

  @ApiProperty({ description: '간략소개', example: '소개글 소개글 소개글' })
  @IsString()
  summary: string;

  @ApiProperty({ description: '최종학력', example: EducationLevel.MIDDLE_SCHOOL, enum: EducationLevel })
  @IsEnum(EducationLevel, { message: 'result must be a valid EducationLevel value' })
  education: EducationLevel;

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

        city: '서울특별시',
        reasonForLeaving: '개인적인 이유',
      },
    ],
  })
  @IsArray()
  @Type(() => CreateExperienceDto)
  @ValidateNested({ each: true }) // 배열의 각 요소를 검증
  experience: CreateExperienceDto[];

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

  // @ApiProperty({ description: '자기소개', example: '소개글 소개글 소개글' })
  // @Length(0, 500, { message: 'introduction must not exceed 500 characters' })
  // @IsString()
  // introduction: string;

  // @ApiProperty({ description: '경력기술서', example: '경력 기술서' })
  // @Length(0, 500, { message: 'careerDetail must not exceed 500 characters' })
  // @IsString()
  // careerDetail: string;

  @ApiProperty({
    description: '자격증',
    type: [LicenseDto],
    example: [{ licenseName: '운전면허 1종 보통', licenseStage: 'FINAL' }],
  })
  @IsArray()
  @Type(() => LicenseDto)
  @ValidateNested({ each: true })
  licenses: LicenseDto[];

  @ApiProperty({
    description: '병역상태',
    type: CreateMilitaryDto,
    example: {
      militaryStatus: 'NONE',
      reason: '',
      enlistmentDate: null,
      dischargeDate: null,
    },
  })
  @IsOptional()
  @Type(() => CreateMilitaryDto)
  @ValidateNested()
  military?: CreateMilitaryDto;

  @ApiProperty({ description: '필수항목 수집동의', example: true })
  @IsBoolean()
  @IsTrue()
  isRequiredAgreement: boolean;

  @ApiProperty({ description: '선택항목 수집동의', example: false })
  @IsBoolean()
  isOptionalAgreement: boolean;
}
