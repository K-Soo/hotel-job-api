import { Expose } from 'class-transformer';

export class EmployerResponseDto {
  @Expose()
  accessToken: string;
}
