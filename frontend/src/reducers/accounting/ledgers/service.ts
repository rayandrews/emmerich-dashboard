import { request, AxiosPromise } from '@/utils/request';

import {
  IListLedgerResponse,
  ICreateLedgerPayload,
  ICreateLedgerResponse,
  IUpdateLedgerPayload,
  IUpdateLedgerResponse,
} from './types';

export const listLedgersService = () =>
  request.get('/accounting/ledgers') as AxiosPromise<IListLedgerResponse>;

export const createLedgerService = (payload: ICreateLedgerPayload) =>
  request.post('/accounting/ledgers', payload) as AxiosPromise<
    ICreateLedgerResponse
  >;

export const updateLedgerService = (payload: IUpdateLedgerPayload) =>
  request.patch('/accounting/ledgers', payload) as AxiosPromise<
    IUpdateLedgerResponse
  >;

// export const deleteLedgerService = () =>
//   request.delete('/accounting/ledgers') as AxiosPromise<
//     IDel
//   >;
