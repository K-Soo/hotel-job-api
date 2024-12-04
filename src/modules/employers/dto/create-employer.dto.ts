import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, ValidateIf } from 'class-validator';
import { regex, validationMessage } from '../../../common/utils/regex';
import { Expose } from 'class-transformer';
export class CreateEmployerDto {
  @ApiProperty({ description: '사업자 유저 아이디', example: 'kana123' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(5, 20, validationMessage('userId'))
  @Matches(regex.USER_ID, validationMessage('userId'))
  userId: string;

  @ApiProperty({ description: '이름', example: '홍길동' })
  @IsString()
  @IsNotEmpty()
  @Matches(regex.ALL_SPACE, validationMessage('name'))
  name: string;

  @ApiProperty({ description: '비밀번호', example: '@ER123' })
  @IsString()
  @IsNotEmpty()
  @Matches(regex.PASSWORD, validationMessage('password'))
  password: string;
}
