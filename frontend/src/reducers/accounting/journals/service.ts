import { request, AxiosPromise } from '@/utils/request';

import {
  IListJournalResponse,
  ICreateJournalPayload,
  ICreateJournalResponse,
} from './types';

export const listJournalsService = (_, meta: string = '') =>
  request.get(`/accounting/transactions?${meta}`) as AxiosPromise<
    IListJournalResponse
  >;

export const createJournalService = (payload: ICreateJournalPayload) =>
  request.post('/accounting/transactions', payload) as AxiosPromise<
    ICreateJournalResponse
  >;

export const updateJournalService = (
  payload: ICreateJournalPayload,
  id: string = '',
) =>
  request.patch(`/accounting/transactions/${id}`, payload) as AxiosPromise<
    ICreateJournalResponse
  >;

export const deleteJournalService = (_, id: string = '') =>
  request.delete(`/accounting/transactions/${id}`) as AxiosPromise;
