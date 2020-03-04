import { request, AxiosPromise } from '@/utils/request';

import {
  Account,
  IListAccountResponse,
  ICreateAccountPayload,
  ICreateAccountResponse,
  IUpdateAccountPayload,
  IUpdateAccountResponse,
} from './types';

export const listAccountsService = (_, meta: string = '') => {
  return request.get(`/accounting/accounts?${meta}`) as AxiosPromise<Account[]>;
};

export const listAccountParentsService = (_, meta: string = '') => {
  return request.get(`/accounting/accounts/parents?${meta}`) as AxiosPromise<
    IListAccountResponse
  >;
};

export const getSpecificAccountService = (_, id: string = '') =>
  request.get(`/accounting/accounts/${id}`) as AxiosPromise<Account>;

export const createAccountService = (payload: ICreateAccountPayload) =>
  request.post('/accounting/accounts', payload) as AxiosPromise<
    ICreateAccountResponse
  >;

export const updateAccountService = (
  payload: IUpdateAccountPayload,
  id: string = '',
) =>
  request.patch(`/accounting/accounts/${id}`, payload) as AxiosPromise<
    IUpdateAccountResponse
  >;

export const deleteAccountService = (_, id: string = '') =>
  request.delete(`/accounting/accounts/${id}`) as AxiosPromise;
