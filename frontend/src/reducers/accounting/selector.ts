import { createSelector } from 'reselect';
import * as R from 'ramda';

import { State } from './reducer';

import { getListOfLedgers, getCreateLedger, getUpdateLedger } from './ledgers';
import {
  getListOfAccounts,
  getCreateAccount,
  getUpdateAccount,
} from './accounts';
import {
  getListOfJournals,
  getCreateJournal,
  getLoadingStatusCreateJournal,
} from './journals';

// 1. Ledgers Selector
export const getAccountingLedgers = createSelector(
  R.path<State['ledgers']>(['ledgers']),
  R.identity,
);

// 1.1. List of ledgers selector
export const getListOfLedgersFromAccounting = R.compose(
  getListOfLedgers,
  getAccountingLedgers,
);
// End of list of ledgers Selector

// 1.2. Create ledger Selector
export const getCreateLedgerFromAccounting = R.compose(
  getCreateLedger,
  getAccountingLedgers,
);

// 1.3. Update ledger Selector
export const getUpdateLedgerFromAccounting = R.compose(
  getUpdateLedger,
  getAccountingLedgers,
);

// 2. Accounts Selector
export const getAccountingAccounts = createSelector(
  R.path<State['accounts']>(['accounts']),
  R.identity,
);

// 2.1 List of accounts selector
export const getListOfAccountsFromAccounting = R.compose(
  getListOfAccounts,
  getAccountingAccounts,
);
// End of list of accounts Selector

// 2.2. Create account Selector
export const getCreateAccountFromAccounting = R.compose(
  getCreateAccount,
  getAccountingAccounts,
);

// 2.3. Update account Selector
export const getUpdateAccountFromAccounting = R.compose(
  getUpdateAccount,
  getAccountingAccounts,
);

// 3. Journals Selector
export const getAccountingJournals = createSelector(
  R.path<State['journals']>(['journals']),
  R.identity,
);

// 3.1. List of journals selector
export const getListOfJournalsFromAccounting = R.compose(
  getListOfJournals,
  getAccountingJournals,
);
// End of list of journals Selector

// 3.2. Create journal Selector
export const getCreateJournalFromAccounting = R.compose(
  getCreateJournal,
  getAccountingJournals,
);

export const getLoadingStatusCreateJournalFromAccounting = R.compose(
  getLoadingStatusCreateJournal,
  getAccountingJournals,
);
// End of journals Selector
