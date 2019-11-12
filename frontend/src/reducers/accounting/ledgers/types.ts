import { IErrorWithLoading } from '@/utils/reducers';

// general types
export enum LedgerType {
  ASSET = 'asset',
  LIABILITY = 'liability',
  EQUITY = 'equity',
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const LedgerTypeArray = [
  LedgerType.ASSET,
  LedgerType.LIABILITY,
  LedgerType.EQUITY,
  LedgerType.INCOME,
  LedgerType.EXPENSE,
];

export interface Ledger {
  id: number;
  name: string;
  type: LedgerType;
  createdAt: Date;
  updatedAt: Date;
}
// end of general types

// 1. List of journals
export type IListLedgersState = Ledger[];

export type IListLedgerResponse = IListLedgersState;
// End of List of Ledgers

// 2. Create journal entries
export type ICreateLedgerState = Partial<Ledger>;

export interface ICreateLedgerPayload {
  name: string;
  ledger: number;
}

export type ICreateLedgerResponse = Ledger;
// End of create journal entries

// 3. Update journal entries
export type IUpdateLedgerState = Partial<Ledger>;

export type IUpdateLedgerPayload = Partial<ICreateLedgerPayload>;

export type IUpdateLedgerResponse = Ledger;
// End of create journal entries

export interface State {
  list: IErrorWithLoading<IListLedgersState>;
  create: IErrorWithLoading<ICreateLedgerState>;
  update: IErrorWithLoading<IUpdateLedgerState>;
}
