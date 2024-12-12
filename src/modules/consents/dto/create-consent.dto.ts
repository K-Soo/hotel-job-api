import { IsBoolean } from 'class-validator';
import { IsTrue } from '../../../common/validations/is-true.decorator';

export class CreateConsentDto {
  @IsBoolean()
  @IsTrue()
  personalInfoAgree: boolean;

  @IsBoolean()
  @IsTrue()
  serviceTermsAgree: boolean;

  @IsBoolean()
  marketingAgree: boolean;
}
