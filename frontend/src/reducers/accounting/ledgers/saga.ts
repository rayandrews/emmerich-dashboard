import { takeEvery, fork, all } from 'redux-saga/effects';

import { createApi } from '@/utils/sagas/api';

import {
  getLedgersAction,
  createLedgerAction,
  updateLedgerAction,
} from './actions';
import {
  listLedgersService,
  createLedgerService,
  updateLedgerService,
} from './service';

// 1. List all ledgers
function* handleListLedgers() {
  yield takeEvery(
    getLedgersAction.request,
    createApi(listLedgersService, getLedgersAction),
  );
}
// End list all ledgers

// 2. Create ledger entries
function* handleCreateLedger() {
  yield takeEvery(
    createLedgerAction.request,
    createApi(createLedgerService, createLedgerAction, {
      showSuccess: true,
      showFailure: true,
    }),
  );
}
// End of create ledger entries

// 3. Update ledger entries
function* handleUpdateLedger() {
  yield takeEvery(
    updateLedgerAction.request,
    createApi(updateLedgerService, updateLedgerAction, {
      showSuccess: true,
      showFailure: true,
    }),
  );
}
// End of create ledger entries

export function* saga() {
  yield all([
    fork(handleListLedgers),
    fork(handleCreateLedger),
    fork(handleUpdateLedger),
  ]);
}
