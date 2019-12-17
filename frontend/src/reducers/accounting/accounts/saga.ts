import { takeEvery, fork, all } from 'redux-saga/effects';

import { push } from 'connected-react-router';

import { createApi } from '@/utils/sagas/api';

import * as routes from '@/config/routes';

import {
  getAccountsAction,
  createAccountAction,
  updateAccountAction,
  deleteAccountAction,
} from './actions';
import {
  listAccountsService,
  createAccountService,
  updateAccountService,
  deleteAccountService,
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
      actionCallback: push(routes.accounting.account.list),
    }),
  );
}
// End of create account entries

// 3. Update account entries
function* handleUpdateAccount() {
  yield takeEvery(
    updateAccountAction.request,
    createApi(updateAccountService, updateAccountAction, {
      showSuccess: true,
      showFailure: true,
      actionCallback: push(routes.accounting.account.list),
    }),
  );
}
// End of update account entries

// 3. Delete account entries
function* handleDeleteAccount() {
  yield takeEvery(
    deleteAccountAction.request,
    createApi(deleteAccountService, deleteAccountAction, {
      showSuccess: true,
      showFailure: true,
      actionCallback: push(routes.accounting.account.list),
    }),
  );
}
// End of delete account entries

export function* saga() {
  yield all([
    fork(handleListAccounts),
    fork(handleCreateAccount),
    fork(handleUpdateAccount),
    fork(handleDeleteAccount),
  ]);
}
