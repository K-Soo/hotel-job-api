import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, IsOptional } from 'class-validator';
import { validationMessage } from '../../../common/utils/regex';

export class RequestVerificationDto {
  @ApiProperty({ description: '사업자 유저 이름', example: '고원호' })
  @IsString()
  @IsOptional()
  userName?: string | null;

  @ApiProperty({ description: '담당자 이메일', example: 'kanabun102@naver.com' })
  @Length(5, 40, validationMessage('email'))
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: '리다이렉트 URL', example: '/recover/account/success' })
  @IsString()
  redirect: string;
}
