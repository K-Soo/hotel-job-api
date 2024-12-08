import { ProviderRoleType, UserRoleType } from '../../../common/types';

export interface KakaoUser {
  id: number;
  connected_at: Date;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile: {
      nickname: string;
      is_default_nickname: boolean;
    };
  };
}

export interface RequestUser {
  id: string;
  userId: number;
  provider: ProviderRoleType;
  role: UserRoleType;
  createdAt: Date;
  updatedAt: Date;
}
