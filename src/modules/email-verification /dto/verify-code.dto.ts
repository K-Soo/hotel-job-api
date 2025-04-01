import { IsEmail, IsString } from 'class-validator';

export class VerifyCodeDto {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;

  @IsString()
  code: string;
}
