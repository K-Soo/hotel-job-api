import { Expose, Type } from 'class-transformer';
import { ApplicationStatus, ReviewStageStatus } from '../../../common/constants/application';
import { ApplicationRecruitmentResponseDto } from './application-recruitment-response.dto';
import { ValidateNested } from 'class-validator';
export class ApplicationResponseDto {
  @Expose()
  id: string;

  @Expose()
  applicationStatus: ApplicationStatus;

  @Expose()
  reviewStageStatus: ReviewStageStatus;

  @Expose()
  createdAt: Date;

  @Expose()
  applyAt: Date;

  @Expose()
  cancelAt: Date;

  @Expose()
  @Type(() => ApplicationRecruitmentResponseDto)
  @ValidateNested({ each: true })
  recruitment: ApplicationRecruitmentResponseDto;
}
