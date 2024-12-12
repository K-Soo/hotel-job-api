import { ProviderRoleType, UserRoleType } from '../types';

export interface EmployerUser {
  id: string;
  userId: string;
  name: string;
  password: string;
  provider: ProviderRoleType;
  role: UserRoleType;
  createdAt: Date;
  updatedAt: Date;
}
