import { request, AxiosPromise } from '@/utils/request';

import {
  ICreateUserPayload,
  ICreateUserResponse,
  ICreateUserWithLoginResponse,
} from './types';

export const createUserService = (payload: ICreateUserPayload) =>
  request.post('/users', payload) as AxiosPromise<ICreateUserResponse>;

export const createUserWithLoginService = (payload: ICreateUserPayload) =>
  request.post('/users/withLogin', payload) as AxiosPromise<
    ICreateUserWithLoginResponse
  >;
