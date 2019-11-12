import { takeEvery, fork, all } from 'redux-saga/effects';

import { createApi } from '@/utils/sagas/api';

import { getJournalsAction, createJournalAction } from './actions';
import { listJournalsService, createJournalService } from './service';

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

export function* saga() {
  yield all([fork(handleListJournals), fork(handleCreateJournal)]);
}
