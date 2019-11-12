// 1. get ledgers
export const GET_LEDGERS_REQUEST = '@@/ACCOUNTING/LEDGER/GET_LEDGERS_REQUEST';
export const GET_LEDGERS_SUCCESS = '@@/ACCOUNTING/LEDGER/GET_LEDGERS_SUCCESS';
export const GET_LEDGERS_FAILURE = '@@/ACCOUNTING/LEDGER/GET_LEDGERS_FAILURE';

// 2. create ledger entries
export const CREATE_LEDGER_REQUEST =
  '@@/ACCOUNTING/LEDGER/CREATE_LEDGER_REQUEST';
export const CREATE_LEDGER_SUCCESS =
  '@@/ACCOUNTING/LEDGER/CREATE_LEDGER_ENTRIES_SUCCESS';
export const CREATE_LEDGER_FAILURE =
  '@@/ACCOUNTING/LEDGER/CREATE_LEDGER_ENTRIES_FAILURE';

// 3. update ledger entries
export const UPDATE_LEDGER_REQUEST =
  '@@/ACCOUNTING/LEDGER/UPDATE_LEDGER_ENTRIES_REQUEST';
export const UPDATE_LEDGER_SUCCESS =
  '@@/ACCOUNTING/LEDGER/UPDATE_LEDGER_ENTRIES_SUCCESS';
export const UPDATE_LEDGER_FAILURE =
  '@@/ACCOUNTING/LEDGER/UPDATE_LEDGER_ENTRIES_FAILURE';

// 4. delete ledger entries
export const DELETE_LEDGER_REQUEST =
  '@@/ACCOUNTING/LEDGER/DELETE_LEDGER_ENTRIES_REQUEST';
export const DELETE_LEDGER_SUCCESS =
  '@@/ACCOUNTING/LEDGER/DELETE_LEDGER_ENTRIES_SUCCESS';
export const DELETE_LEDGER_FAILURE =
  '@@/ACCOUNTING/LEDGER/DELETE_LEDGER_ENTRIES_FAILURE';