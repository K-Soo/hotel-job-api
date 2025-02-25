import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class SendPushToUserDto {
  @ApiProperty({ description: '제목', example: '타이틀' })
  @IsString()
  title: string;

  @ApiProperty({ description: '메세지 본문', example: '메세지 본문' })
  @IsString()
  body: string;

  @ApiProperty({ description: '링크', example: '메세지 본문' })
  @IsString()
  @IsOptional()
  link?: string;

  @ApiProperty({ description: '수신자 ID', example: ['user1', 'user2'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  userIds: string[];
}
