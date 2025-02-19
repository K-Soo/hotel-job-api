import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { AnnouncementType, ResultNotificationStatus } from '../../../../common/constants/application';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnnouncementDto {
  @IsString()
  title: string; // 발표명

  @IsString()
  message: string; // 발표 문구

  @IsEnum(AnnouncementType)
  announcementType: AnnouncementType; // 합격/불합격 구분

  @ApiProperty({
    description: '전형 단계',
    enum: ResultNotificationStatus,
    examples: ResultNotificationStatus,
  })
  @IsEnum(ResultNotificationStatus)
  resultNotificationStatus: ResultNotificationStatus; // 전형 단계

  @IsNotEmpty()
  recruitmentId: string; // 채용 공고 ID

  @IsNotEmpty()
  recipientApplicationIds: number[]; // 발표 대상 지원서 ID
}
