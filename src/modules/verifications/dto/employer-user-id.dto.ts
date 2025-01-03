import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class EmployerUserIdDto {
  @ApiProperty({ description: '아이디', example: 'test123456' })
  @Length(8, 16)
  @IsString()
  @IsNotEmpty()
  userId: string;
}
