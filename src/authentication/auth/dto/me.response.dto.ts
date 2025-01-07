import { Expose } from 'class-transformer';
import {
  AccountStatus,
  VerificationStatus,
  Role,
  Provider,
  CertificationStatus,
} from '../../../common/constants/app.enum';
export class MeResponseDto {
  @Expose()
  role: Role;

  @Expose()
  provider: Provider;

  @Expose()
  accountStatus: AccountStatus;

  @Expose()
  nickname: string;

  @Expose()
  companyVerificationStatus: VerificationStatus;

  @Expose()
  certificationStatus: CertificationStatus;
}
