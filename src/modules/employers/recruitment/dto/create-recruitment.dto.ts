import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { validationMessage } from '../../../../common/utils/regex';
import { RecruitmentStatus } from '../../../../common/constants/recruitment';
import { RecruitmentInfoDto } from './recruitmentInfo.dto';
import { LocationInfoDto } from './location-info.dto';
import { ManagerInfoDto } from './manager-info.dto';
import { ConditionInfoDto } from './condition-info.dto';

export class CreateRecruitmentDto {
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({ description: '공고 제목', example: '당번 구함' })
  @Expose()
  @Length(5, 30, validationMessage('recruitmentTitle'))
  @IsString()
  @IsNotEmpty()
  recruitmentTitle: string;

  @ApiProperty({
    description: '공고상태',
    example: RecruitmentStatus.DRAFT,
    enum: RecruitmentStatus,
  })
  @IsEnum(RecruitmentStatus)
  recruitmentStatus: RecruitmentStatus;

  @ApiProperty({ description: '모집내용', type: RecruitmentInfoDto })
  @Expose()
  @Type(() => RecruitmentInfoDto)
  @ValidateNested()
  @IsNotEmpty()
  recruitmentInfo: RecruitmentInfoDto;

  @ApiProperty({
    description: '상세 모집내용',
    example: '<h3>상세 내용</h3><p>여기에 상세한 내용을 작성하세요.</p>',
  })
  @Expose()
  @IsString()
  content: string;

  @ApiProperty({ description: '근무 조건', type: ConditionInfoDto })
  @ValidateNested()
  @Expose()
  @Type(() => ConditionInfoDto)
  @IsNotEmpty()
  conditionInfo: ConditionInfoDto;

  @ApiProperty({ description: '근무지 정보', type: LocationInfoDto })
  @Expose()
  @Type(() => LocationInfoDto)
  @IsNotEmpty()
  locationInfo: LocationInfoDto;

  @ApiProperty({ description: '인사담당자 정보', type: ManagerInfoDto })
  @Expose()
  @Type(() => ManagerInfoDto)
  @IsNotEmpty()
  managerInfo: ManagerInfoDto;
}
