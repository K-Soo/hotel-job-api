import { Expose } from 'class-transformer';
import { AccountStatus, CertificationStatus, VerificationStatus } from '../../../common/constants/app.enum';

export class SignInResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  role: string;

  @Expose()
  provider: string;

  @Expose()
  accountStatus: AccountStatus;

  @Expose()
  nickname: string;

  @Expose()
  certificationStatus: CertificationStatus;

  @Expose()
  companyVerificationStatus: VerificationStatus;
}
