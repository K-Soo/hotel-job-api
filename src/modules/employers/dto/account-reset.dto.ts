import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { regex, validationMessage } from '../../../common/utils/regex';

export class AccountResetDto {
  @ApiProperty({
    description: '8자 이상 16자 이하, 대소문자 구분없이, 숫자, 특수문자(@, $, !, %, *, ?, &)를 최소 1개씩 포함',
    example: '@e123456',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(regex.PASSWORD, validationMessage('currentPassword'))
  currentPassword: string;

  @ApiProperty({
    description: '8자 이상 16자 이하, 대소문자 구분없이, 숫자, 특수문자(@, $, !, %, *, ?, &)를 최소 1개씩 포함',
    example: '@e123456',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(regex.PASSWORD, validationMessage('newPassword'))
  newPassword: string;
}
