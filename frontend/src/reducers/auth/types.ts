import * as t from 'io-ts';

import { DeepReadonly } from 'utility-types';

import { IErrorWithLoading } from '@/utils/reducers';

export interface User {
  userId: number;
  username: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  lastLogin: string;
  roles: string[];
}

export type BaseState = DeepReadonly<{
  expiresIn: string | null;
  accessToken: string | null;
  user: User | null;
}>;

export interface State extends IErrorWithLoading<BaseState> {}

// 1. Login
export const LoginPayload = t.type({
  username: t.string,
  password: t.string,
});

export type ILoginPayload = t.TypeOf<typeof LoginPayload>;

export const LoginResponse = t.type({
  expiresIn: t.string,
  accessToken: t.string,
});

export type ILoginResponse = t.TypeOf<typeof LoginResponse>;
// End of Login

// 2. Check profile
export type ICheckProfileResponse = User;
// End of check profile
