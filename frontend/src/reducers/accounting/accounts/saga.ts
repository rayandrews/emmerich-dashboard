import { takeEvery, fork, all } from 'redux-saga/effects';

import { createApi } from '@/utils/sagas/api';

import {
  getAccountsAction,
  createAccountAction,
  updateAccountAction,
} from './actions';
import {
  listAccountsService,
  createAccountService,
  updateAccountService,
} from './service';

// 1. List all accounts
function* handleListAccounts() {
  yield takeEvery(
    getAccountsAction.request,
    createApi(listAccountsService, getAccountsAction),
  );
}
// End list all accounts

// 2. Create account entries
function* handleCreateAccount() {
  yield takeEvery(
    createAccountAction.request,
    createApi(createAccountService, createAccountAction, {
      showSuccess: true,
      showFailure: true,
    }),
  );
}
// End of create account entries

// 3. Update account entries
function* handleUpdateAccount() {
  yield takeEvery(
    updateAccountAction.request,
    createApi(updateAccountService, updateAccountAction),
  );
}
// End of create account entries

export function* saga() {
  yield all([
    fork(handleListAccounts),
    fork(handleCreateAccount),
    fork(handleUpdateAccount),
  ]);
}
