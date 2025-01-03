import { Expose } from 'class-transformer';

export class TalentResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  isVisible: boolean;

  @Expose()
  title: boolean;

  @Expose()
  education: boolean;

  @Expose()
  isGraduated: boolean;

  @Expose()
  updatedAt: boolean;

  @Expose()
  createdAt: boolean;
}
