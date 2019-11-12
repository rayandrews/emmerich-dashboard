import { JwtResponse } from '@/shared/auth/auth.interface';

export interface UserResponse {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  token?: JwtResponse;
}
