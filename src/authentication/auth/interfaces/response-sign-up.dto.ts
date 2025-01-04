import { Expose } from 'class-transformer';
import { AccountStatus, VerificationStatus, Role, Provider } from '../../../common/constants/app.enum';

export class ResponseSignUpDto {
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
}
