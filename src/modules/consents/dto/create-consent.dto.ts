import { IsBoolean } from 'class-validator';
import { IsTrue } from '../../../common/validations/is-true.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConsentDto {
  @ApiProperty({
    description: '나이 약관',
    example: true,
  })
  @IsBoolean()
  @IsTrue()
  ageAgree: boolean;

  @ApiProperty({
    description: '개인정보 약관',
    example: true,
  })
  @IsBoolean()
  @IsTrue()
  personalInfoAgree: boolean;

  @ApiProperty({
    description: '서비스 이용약관',
    example: true,
  })
  @IsBoolean()
  @IsTrue()
  serviceTermsAgree: boolean;

  @ApiProperty({
    description: 'Email marketing agreement (optional)',
    example: false,
    required: false,
  })
  @IsBoolean()
  smsMarketingAgree: boolean;

  @ApiProperty({
    description: 'Email marketing agreement (optional)',
    example: false,
    required: false,
  })
  @IsBoolean()
  emailMarketingAgree: boolean;
}
