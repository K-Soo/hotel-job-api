import { Expose } from 'class-transformer';
import { CreateResumeDto } from './create-resume.dto';
import { SanctionReason } from '../../../common/constants/app.enum';

export class ResumeResponseDto extends CreateResumeDto {
  @Expose()
  uuid: string;

  @Expose()
  isVisible: string;

  @Expose()
  isDefault: string;

  @Expose()
  status: string;

  @Expose()
  sanctionReason: SanctionReason;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
