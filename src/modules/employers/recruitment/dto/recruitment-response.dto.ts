import { IsNotEmpty, IsString, Length, ValidateIf, IsEnum, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { RecruitmentStatus } from '../../../../common/constants/recruitment';
import { RecruitmentInfoDto } from './recruitmentInfo.dto';
import { LocationInfoDto } from './location-info.dto';
import { ManagerInfoDto } from './manager-info.dto';
import { ConditionInfoDto } from './condition-info.dto';

export class RecruitmentDetailResponseDto {
  @Expose()
  id: string;

  @Expose()
  recruitmentTitle: string;

  @Expose()
  recruitmentStatus: RecruitmentStatus;

  @Expose()
  updateAt: Date;

  @Expose()
  @Type(() => RecruitmentInfoDto)
  recruitmentInfo: RecruitmentInfoDto;

  @Expose()
  content: string;

  @Expose()
  @Type(() => ConditionInfoDto)
  conditionInfo: ConditionInfoDto;

  @Expose()
  @Type(() => LocationInfoDto)
  locationInfo: LocationInfoDto;

  @Expose()
  @Type(() => ManagerInfoDto)
  managerInfo: ManagerInfoDto;
}
