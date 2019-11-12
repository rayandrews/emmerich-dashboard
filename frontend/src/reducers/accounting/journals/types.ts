import * as dinero from 'dinero.js';

import { IErrorWithLoading } from '@/utils/reducers';
import { PaginationResponse } from '@/utils/types';

// general types
export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export interface Journal {
  amount: string;
  memo: string | null;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  currency: dinero.Currency;
  type: TransactionType;
}

export interface Transaction {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  transactionId: string;
  journals: Journal[];
}
// end of general types

// 1. List of journals
// export type IListJournalsState = {
//   [key: string]: {
//     meta: {
//       [TransactionType.CREDIT]: dinero.DineroObject;
//       [TransactionType.DEBIT]: dinero.DineroObject;
//     };
//     data: Journal[];
//   };
// };
export type IListJournalsState = PaginationResponse<Transaction>;

export type IListJournalResponse = IListJournalsState;
// End of List of Journals

// 2. Create journal entries
export type ICreateJournalState = Journal[];

export interface ICreateJournalPayload {
  account: number;
  currency: dinero.Currency;
  amount: number;
  type: TransactionType;
}

export type ICreateJournalPayloadArray = ICreateJournalPayload[];

export type ICreateJournalResponse = ICreateJournalState;
// End of create journal entries

// 3. Update journal entries
export type IUpdateJournalState = Journal[];

export interface IUpdateJournalPayload {
  account: number;
  currency: dinero.Currency;
  amount: number;
  type: TransactionType;
}

export type IUpdateJournalPayloadArray = IUpdateJournalPayload[];

export type IUpdateJournalResponse = ICreateJournalState;
// End of create journal entries

export interface State {
  list: IErrorWithLoading<IListJournalsState>;
  create: IErrorWithLoading<ICreateJournalState>;
}
