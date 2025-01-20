import { Expose } from 'class-transformer';
import { ApplicationStatus } from '../../../common/constants/application';

export class ApplicationResponseDto {
  @Expose()
  id: string;

  @Expose()
  applicationStatus: ApplicationStatus;

  @Expose()
  createdAt: Date;

  @Expose()
  applyAt: Date;
}
