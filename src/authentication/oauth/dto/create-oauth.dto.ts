import { IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';
import { regex } from '../../../common/utils/regex';
import { CreateConsentDto } from '../../../modules/consents/dto/create-consent.dto';

export class CreateOAuthDto extends CreateConsentDto {
  @IsString()
  @IsNotEmpty()
  @Matches(regex.ALL_SPACE)
  code: string;

  @IsString()
  @IsNotEmpty()
  @Matches(regex.ALL_SPACE)
  @IsIn(['Y', 'N'])
  isInitialRequest: 'Y' | 'N';
}
