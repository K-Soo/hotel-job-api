import { Expose, Type } from 'class-transformer';
import { PublishResumeDto } from './publish-resume.dto';
import { SanctionReason, ResumeStatus } from '../../../common/constants/app.enum';
import { ApplicationResponseDto } from '../../applications/dto/application-response.dto';
import { IsArray, ValidateNested } from 'class-validator';
export class ResumeResponseDto extends PublishResumeDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  isVisible: boolean;

  @Expose()
  isDefault: boolean;

  @Expose()
  status: ResumeStatus;

  @Expose()
  sanctionReason: SanctionReason;

  @Expose()
  @IsArray()
  @Type(() => ApplicationResponseDto)
  @ValidateNested({ each: true })
  applications: ApplicationResponseDto[];

  @Expose()
  applicationsCount: number;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
