import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateResumeDto {
  @ApiProperty({ description: '이력서 제목', example: '나의 이력서' })
  @Expose()
  @Length(5, 255)
  @IsString()
  title: string;
}
