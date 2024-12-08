import { ProviderRoleType } from '../../../common/types';

export interface Payload {
  id: string;
  iss: 'hotel-job-connect';
  lat: number; //발급 시간
  exp: number; //만료 시간
  provider: ProviderRoleType;
}
