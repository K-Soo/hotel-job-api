import { Expose } from 'class-transformer';

export class SignInResponseDto {
  @Expose()
  userId: string;

  @Expose()
  accessToken: string;

  @Expose()
  provider: string;
}
