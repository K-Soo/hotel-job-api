import { ProviderType, RoleType } from '../../../common/types';

export interface KakaoPayload {
  aud: string;
  sub: string;
  auth_time: number;
  iss: string;
  nickname: string;
  exp: number;
  iat: number;
  email: string;
}

export interface RequestUser {
  id: string;
  userId: string;
  provider: ProviderType;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
}
