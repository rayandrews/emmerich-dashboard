import { request, AxiosPromise } from '@/utils/request';

import { ILoginPayload, ILoginResponse, ICheckProfileResponse } from './types';

// 1. Login
export const loginService = (payload: ILoginPayload) =>
  request.post('/login', payload) as AxiosPromise<ILoginResponse>;

// 2. Check Profile
export const checkProfileService = () =>
  request.get('/profile') as AxiosPromise<ICheckProfileResponse>;
