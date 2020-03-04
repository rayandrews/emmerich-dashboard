import { takeEvery, fork, all } from 'redux-saga/effects';

import { createApi } from '@/utils/sagas/api';

import {
  getJournalsAction,
  createJournalAction,
  updateJournalAction,
  deleteJournalAction,
} from './actions';
import {
  listJournalsService,
  createJournalService,
  deleteJournalService,
  updateJournalService,
} from './service';

// 1. List all journals
function* handleListJournals() {
  yield takeEvery(
    getJournalsAction.request,
    createApi(listJournalsService, getJournalsAction),
  );
}
// End list all journals

// 2. Create journal entries
function* handleCreateJournal() {
  yield takeEvery(
    createJournalAction.request,
    createApi(createJournalService, createJournalAction, {
      showSuccess: true,
      showFailure: true,
    }),
  );
}
// End of create journal entries

// 3. Update journal entries
function* handleUpdateJournal() {
  yield takeEvery(
    updateJournalAction.request,
    createApi(updateJournalService, updateJournalAction, {
      showSuccess: true,
      showFailure: true,
    }),
  );
}
// End of update journal entries

// 4. Delete journal entries
function* handleDeleteJournal() {
  yield takeEvery(
    deleteJournalAction.request,
    createApi(deleteJournalService, deleteJournalAction, {
      showSuccess: true,
      showFailure: true,
    }),
  );
}
// End of delete journal entries

export function* saga() {
  yield all([
    fork(handleListJournals),
    fork(handleCreateJournal),
    fork(handleUpdateJournal),
    fork(handleDeleteJournal),
  ]);
}
