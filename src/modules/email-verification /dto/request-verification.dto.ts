import { IsEmail, IsString } from 'class-validator';

export class RequestVerificationDto {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;
}
