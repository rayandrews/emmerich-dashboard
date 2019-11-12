import { createSelector } from 'reselect';
import * as R from 'ramda';

import {
  State,
  IListLedgersState,
  ICreateLedgerState,
  IUpdateLedgerState,
} from './types';

// 1. List of ledgers selector
export const getListOfLedgersState = createSelector(
  R.path<State['list']>(['list']),
  R.identity,
);

export const getListOfLedgers = createSelector(
  getListOfLedgersState,
  R.path<IListLedgersState>(['state']),
);

export const getListOfLedgersStatus = createSelector(
  getListOfLedgersState,
  R.path<boolean>(['loading']),
);
// end of list of ledgers selector

// 2. Create ledger selector
export const getCreateLedgerState = createSelector(
  R.path<State['create']>(['create']),
  R.identity,
);

export const getCreateLedger = createSelector(
  getCreateLedgerState,
  R.path<ICreateLedgerState>(['state']),
);
// end of create ledger selector

// 3. Update ledger selector
export const getUpdateLedgerState = createSelector(
  R.path<State['create']>(['create']),
  R.identity,
);

export const getUpdateLedger = createSelector(
  getUpdateLedgerState,
  R.path<IUpdateLedgerState>(['state']),
);
// end of create ledger selector
