import { IsArray, IsEnum, IsInt, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  RecruitmentDuration,
  RecruitmentOptionTag,
  RecruitmentProductName,
  RecruitmentProductOptionName,
  RecruitmentProductType,
} from '../../../../common/constants/product';

export class DurationDto {
  @IsUUID()
  id: string;

  @IsEnum(RecruitmentDuration)
  duration: RecruitmentDuration;

  @IsInt()
  bonusDays: number;

  @IsInt()
  price: number;

  @IsNumber()
  discountRate: number;
}

export class OptionsDto {
  @IsUUID()
  id: string;

  @IsEnum(RecruitmentProductOptionName)
  name: RecruitmentProductOptionName;

  @IsInt()
  listUpIntervalHours: number;

  @IsInt()
  maxListUpPerDay: number;

  @IsEnum(RecruitmentOptionTag, { each: true })
  @IsArray()
  tags: RecruitmentOptionTag[];

  @IsInt()
  bonusDays: number;

  @IsNumber()
  discountRate: number;

  @IsEnum(RecruitmentDuration)
  duration: RecruitmentDuration;

  @IsInt()
  price: number;
}

export class InitiateRecruitmentPaymentDto {
  @IsUUID()
  id: string;

  @IsUUID()
  recruitmentId: string;

  @IsEnum(RecruitmentProductName)
  name: RecruitmentProductName;

  @IsEnum(RecruitmentProductType)
  type: RecruitmentProductType;

  @ValidateNested()
  @Type(() => DurationDto)
  duration: DurationDto;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => OptionsDto)
  options: OptionsDto[];
}
