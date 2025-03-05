import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty, IsEnum, IsOptional, IsObject } from 'class-validator';
import { NotificationType, CategoryType } from '../../../common/constants/notification';

export class SendNotificationDto {
  @ApiProperty({ description: '수신자 ID', example: ['91aa8042-78e9-4cbb-a30d-f976f85c1078'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  userIds: string[];

  @ApiProperty({ enum: CategoryType, description: '카테고리', example: CategoryType.APPLICANT })
  @IsEnum(CategoryType)
  category: CategoryType;

  @ApiProperty({ description: '제목', example: '타이틀' })
  @IsString()
  title: string;

  @ApiProperty({
    description: '메세지 본문',
    example: '코딧(CODITCorp.)의 프론트엔드 개발자 (React.js 2년이상) 지원을 취소했습니다.',
  })
  @IsString()
  message: string;

  @ApiProperty({
    enum: NotificationType,
    description: '메세지 본문',
    example: [NotificationType.IN_APP],
    isArray: true,
  })
  @IsEnum(NotificationType, { each: true })
  @IsArray()
  @ArrayNotEmpty()
  notificationType: NotificationType[];

  @ApiPropertyOptional({
    description: '링크',
    example: '/recruit',
  })
  @IsString()
  link: string;
}
