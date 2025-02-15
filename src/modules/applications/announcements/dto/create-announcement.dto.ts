import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { AnnouncementType, ReviewStageStatus } from '../../../../common/constants/application';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnnouncementDto {
  @IsString()
  title: string; // 발표명

  @IsString()
  message: string; // 발표 문구

  @IsEnum(AnnouncementType)
  announcementType: AnnouncementType; // 합격/불합격 구분

  @ApiProperty({ description: '전형 단계', enum: ReviewStageStatus, examples: ReviewStageStatus })
  @IsEnum(ReviewStageStatus)
  reviewStage: ReviewStageStatus; // 전형 단계

  @IsNotEmpty()
  recruitmentId: string; // 채용 공고 ID

  @IsNotEmpty()
  recipientApplicationIds: number[]; // 발표 대상자
}
