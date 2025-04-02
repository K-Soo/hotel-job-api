import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { validationMessage } from '../../../common/utils/regex';

export class AccountVerificationDto {
  @ApiProperty({ description: '사업자 유저 이름', example: '고원호' })
  @IsString()
  userName: string;

  @ApiProperty({ description: '담당자 이메일', example: 'kanabun102@naver.com' })
  @Length(5, 40, validationMessage('email'))
  @IsString()
  @IsEmail()
  email: string;
}
