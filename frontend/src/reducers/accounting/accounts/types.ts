import * as dinero from 'dinero.js';

import { IErrorWithLoading } from '@/utils/reducers';

// general types

export enum AccountType {
  ASSET = 'asset',
  LIABILITY = 'liability',
  EQUITY = 'equity',
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Account {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  currency: dinero.Currency;
  balance: string;
  startingCredit: string;
  startingDebit: string;
  type: AccountType;
  // children: Account[];
  parent: Account | null;
}
// end of general types

// 1. List of journals
export type IListAccountsState = Account[];

export type IListAccountResponse = IListAccountsState;
// End of List of Accounts

// 2. Create journal entries
export type ICreateAccountState = Partial<Account>;

export interface ICreateAccountPayload {
  name: string;
  type: number;
  parent?: {
    id: number;
  };
}

export type ICreateAccountResponse = Account;
// End of create journal entries

// 3. Update journal entries
export type IUpdateAccountState = Partial<Account>;

export type IUpdateAccountPayload = Partial<
  Omit<Account, 'id' | 'children'> & ICreateAccountPayload
>;

export type IUpdateAccountResponse = Account;
// End of create journal entries

export interface State {
  list: IErrorWithLoading<IListAccountsState>;
  create: IErrorWithLoading<ICreateAccountState>;
  update: IErrorWithLoading<IUpdateAccountState>;
}
