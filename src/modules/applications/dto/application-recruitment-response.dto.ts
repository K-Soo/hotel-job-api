import { Expose } from 'class-transformer';

export class ApplicationRecruitmentResponseDto {
  @Expose()
  id: string;

  @Expose()
  recruitmentTitle: string;

  @Expose()
  hotelName: string;
}
