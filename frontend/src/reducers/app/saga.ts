import { put, takeEvery, fork, all } from 'redux-saga/effects';
import { call } from 'typed-redux-saga';

import { fetchCsrfAction } from './actions';
import { csrfService } from './service';

// 1. fetch csrf
export function* fetchCsrf(): Generator {
  const response = yield* call(csrfService);

  try {
    yield put(fetchCsrfAction.success(response.data));
  } catch (err) {
    yield put(fetchCsrfAction.failure(err));
  }
}

function* watchCsrfRequest() {
  yield takeEvery(fetchCsrfAction.request, fetchCsrf);
}
// end of fetch csrf

export function* saga() {
  yield all([fork(watchCsrfRequest)]);
}
