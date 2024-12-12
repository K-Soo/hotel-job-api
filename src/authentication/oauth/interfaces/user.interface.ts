import { ProviderRoleType, UserRoleType } from '../../../common/types';

export interface KakaoPayload {
  aud: string;
  sub: string;
  auth_time: number;
  iss: string;
  nickname: string;
  exp: number;
  iat: number;
}

export interface RequestUser {
  id: string;
  userId: number;
  provider: ProviderRoleType;
  role: UserRoleType;
  createdAt: Date;
  updatedAt: Date;
}
