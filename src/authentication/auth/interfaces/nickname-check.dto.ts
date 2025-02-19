import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { regex } from '../../../common/utils/regex';

export class NicknameCheckDto {
  @ApiProperty()
  @Matches(regex.NICKNAME, {
    message: '닉네임은 한글, 영문, 숫자로만 이루어져야 하며 특수문자와 공백은 포함할 수 없습니다.',
  })
  @MaxLength(10)
  @MinLength(2)
  @IsString()
  newNickname: string;
}
