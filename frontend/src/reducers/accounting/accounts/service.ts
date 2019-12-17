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

export const updateAccountService = (
  payload: IUpdateAccountPayload,
  id: string,
) => {
  return request.patch(
    `/accounting/accounts/${!id ? '' : id}`,
    payload,
  ) as AxiosPromise<IUpdateAccountResponse>;
};

export const deleteAccountService = (_, id: string) =>
  request.delete(`/accounting/accounts/${!id ? '' : id}`) as AxiosPromise;
