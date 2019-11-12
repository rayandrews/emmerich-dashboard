import { createSelector } from 'reselect';
import * as R from 'ramda';

import {
  State,
  IListAccountsState,
  ICreateAccountState,
  IUpdateAccountState,
} from './types';

// 1. List of accounts selector
export const getListOfAccountsState = createSelector(
  R.path<State['list']>(['list']),
  R.identity,
);

export const getListOfAccounts = createSelector(
  getListOfAccountsState,
  R.path<IListAccountsState>(['state']),
);

export const getListOfAccountsStatus = createSelector(
  getListOfAccountsState,
  R.path<boolean>(['loading']),
);
// end of list of accounts selector

// 2. Create account selector
export const getCreateAccountState = createSelector(
  R.path<State['create']>(['create']),
  R.identity,
);

export const getCreateAccount = createSelector(
  getCreateAccountState,
  R.path<ICreateAccountState>(['state']),
);
// end of create account selector

// 3. Update account selector
export const getUpdateAccountState = createSelector(
  R.path<State['create']>(['create']),
  R.identity,
);

export const getUpdateAccount = createSelector(
  getUpdateAccountState,
  R.path<IUpdateAccountState>(['state']),
);
// end of create account selector
