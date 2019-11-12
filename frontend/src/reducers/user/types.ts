import { DeepReadonly } from 'utility-types';

import { ILoginResponse } from '@/reducers/auth';
import { IErrorWithLoading } from '@/utils/reducers';

export type ICreateUserState = DeepReadonly<{
  name: string | null;
  email: string | null;
  id: number | null;
  username: string | null;
  lastLogin: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}>;

export interface State {
  create: IErrorWithLoading<ICreateUserState>;
}

export const constants = {
  // create user with login
  CREATE_WITH_LOGIN_REQUEST: '@@/USER/CREATE_WITH_LOGIN_REQUEST',
  CREATE_WITH_LOGIN_SUCCESS: '@@/USER/CREATE_WITH_LOGIN_SUCCESS',
  CREATE_WITH_LOGIN_FAILURE: '@@/USER/CREATE_WITH_LOGIN_FAILURE',

  // create user
  CREATE_REQUEST: '@@/USER/CREATE_REQUEST',
  CREATE_SUCCESS: '@@/USER/CREATE_SUCCESS',
  CREATE_FAILURE: '@@/USER/CREATE_FAILURE',
};

export interface ICreateUserPayload {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface ICreateUserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserWithLoginResponse extends ICreateUserResponse {
  token: ILoginResponse;
}
