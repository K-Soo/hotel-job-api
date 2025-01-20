import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateIf, IsEnum, Length } from 'class-validator';
import { PartialType, OmitType, PickType } from '@nestjs/mapped-types';
import { CreateRecruitmentDto } from './create-recruitment.dto';
import { RecruitmentStatus } from '../../../../common/constants/recruitment';
import { RecruitmentInfoDto } from './recruitmentInfo.dto';
import { ManagerInfoDto } from './manager-info.dto';
import { LocationInfoDto } from './location-info.dto';
import { ConditionInfoDto } from './condition-info.dto';

export class PartialConditionInfoDto extends PartialType(ConditionInfoDto) {}

export class DraftRecruitmentDto extends PartialType(CreateRecruitmentDto) {
  @ApiProperty({ description: 'pk' })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({ description: '공고 제목', example: '제목' })
  @ValidateIf((o) => o.recruitmentTitle !== '' && o.recruitmentTitle !== null)
  @Length(0, 30)
  @IsString()
  recruitmentTitle: string;

  @ApiProperty({
    description: '공고 상태',
    example: RecruitmentStatus.DRAFT,
    enum: RecruitmentStatus,
    required: true,
  })
  @IsEnum(RecruitmentStatus)
  recruitmentStatus: RecruitmentStatus;

  // @ApiProperty({ description: '채용 정보', type: RecruitmentInfoDto })
  // @Expose()
  // @Type(() => RecruitmentInfoDto)
  // @IsNotEmpty()
  // recruitmentInfo: RecruitmentInfoDto;

  // @ApiProperty({
  //   description: '상세 모집내용',
  //   example: '<h3>상세 내용</h3><p>여기에 상세한 내용을 작성하세요.</p>',
  // })
  // @Expose()
  // @IsString()
  // content: string;

  @ApiProperty({ description: '근무 조건', type: ConditionInfoDto })
  @Expose()
  @Type(() => ConditionInfoDto)
  @IsNotEmpty()
  @IsOptional()
  conditionInfo: ConditionInfoDto;

  // @ApiProperty({ description: '근무지 정보', type: LocationInfoDto })
  // @Expose()
  // @Type(() => LocationInfoDto)
  // @IsNotEmpty()
  // locationInfo: LocationInfoDto;

  // @ApiProperty({ description: '인사담당자 정보', type: ManagerInfoDto })
  // @Expose()
  // @Type(() => ManagerInfoDto)
  // @IsNotEmpty()
  // managerInfo: ManagerInfoDto;
}
