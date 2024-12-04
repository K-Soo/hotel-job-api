import { ProviderType } from '../types';

export interface EmployerUser {
  id: number;
  userId: string;
  name: string;
  password: string;
  provider: ProviderType;
  createdAt: Date;
  updatedAt: Date;
}
