import { ProviderType, RoleType } from '../types';

export interface EmployerUser {
  id: string;
  userId: string;
  name: string;
  password: string;
  provider: ProviderType;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
}
