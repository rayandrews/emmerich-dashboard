import { request, AxiosPromise } from '@/utils/request';

import {
  IListAccountResponse,
  ICreateAccountPayload,
  ICreateAccountResponse,
  IUpdateAccountPayload,
  IUpdateAccountResponse,
} from './types';

export const listAccountsService = (_, meta: string) =>
  request.get(`/accounting/accounts/${!meta ? '' : meta}`) as AxiosPromise<
    IListAccountResponse
  >;

export const createAccountService = (payload: ICreateAccountPayload) =>
  request.post('/accounting/accounts', payload) as AxiosPromise<
    ICreateAccountResponse
  >;

export const updateAccountService = (payload: IUpdateAccountPayload) =>
  request.patch('/accounting/accounts', payload) as AxiosPromise<
    IUpdateAccountResponse
  >;

// export const deleteAccountService = () =>
//   request.delete('/accounting/accounts') as AxiosPromise<
//     IDel
//   >;
