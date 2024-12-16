import { ProviderType, RoleType } from '../../../common/types';

export interface JwtPayload {
  sub: string;
  iss: 'hotel-job-connect';
  lat: number; //발급 시간
  exp: number; //만료 시간
  provider: ProviderType;
  role: RoleType;
}

export type RequestUser = Pick<JwtPayload, 'sub' | 'provider' | 'role'>;
