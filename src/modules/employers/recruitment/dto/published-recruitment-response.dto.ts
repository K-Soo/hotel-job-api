import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RecruitmentStatus } from '../../../../common/constants/recruitment';
import { Jobs } from '../../../../common/constants/app.enum';

export class PublishedRecruitmentResponseDto {
  @ApiProperty({ description: 'uuid' })
  @Expose()
  id: string;

  @ApiProperty({ description: '채용공고 제목' })
  @Expose()
  recruitmentTitle: string;

  @ApiProperty({ description: '채용공고 상태값' })
  @Expose()
  recruitmentStatus: RecruitmentStatus;

  @ApiProperty({ description: '직무' })
  @Expose()
  jobs: Jobs[];
}
