import { Expose } from 'class-transformer';
import {
  AccountStatus,
  VerificationStatus,
  Role,
  Provider,
  CertificationStatus,
} from '../../../common/constants/app.enum';

export class ResponseSignUpDto {
  @Expose()
  role: Role;

  @Expose()
  provider: Provider;

  @Expose()
  accountStatus: AccountStatus;

  @Expose()
  companyVerificationStatus: VerificationStatus;

  @Expose()
  certificationStatus: CertificationStatus;

  @Expose()
  nickname: string;
}
