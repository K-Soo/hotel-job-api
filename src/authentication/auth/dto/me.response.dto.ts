import { Expose } from 'class-transformer';

export class MeResponseDto {
  @Expose()
  role: string;

  @Expose()
  provider: string;
}
