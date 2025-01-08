import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BusinessNumberDto {
  @ApiProperty({
    description: '사업자번호(10자리)',
    example: '1234567890',
  })
  @IsString()
  @Length(10, 10, { message: '사업자번호는 정확히 10자리여야 합니다.' })
  @IsNotEmpty({ message: '사업자번호는 필수입니다.' })
  b_no: string;
}
