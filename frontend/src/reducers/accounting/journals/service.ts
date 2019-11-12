import { request, AxiosPromise } from '@/utils/request';

import {
  IListJournalResponse,
  ICreateJournalPayload,
  ICreateJournalResponse,
} from './types';

export const listJournalsService = (_, meta: string) =>
  request.get(`/accounting/transactions?${meta}`) as AxiosPromise<
    IListJournalResponse
  >;

export const createJournalService = (payload: ICreateJournalPayload) =>
  request.post('/accounting/journals', payload) as AxiosPromise<
    ICreateJournalResponse
  >;
