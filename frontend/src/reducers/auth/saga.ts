import { takeEvery, fork, all, put, delay } from 'redux-saga/effects';
import { call } from 'typed-redux-saga';

import { push } from 'connected-react-router';

import { AxiosError } from 'axios';

import * as routes from '@/config/routes';

import { createApi } from '@/utils/sagas/api';

import { addNotification } from '@/reducers/app';

import { loginAction, checkProfileAction, logoutAction } from './actions';
import { loginService, checkProfileService } from './service';

// 1. Login
function* watchLoginRequest() {
  yield takeEvery(loginAction.request, createApi(loginService, loginAction));
}

// 2. Check Profile
function* handleCheckProfile() {
  try {
    const response = yield* call(checkProfileService);
    yield put(checkProfileAction.success(response.data));
  } catch (_err) {
    const err = _err as AxiosError;
    yield put(checkProfileAction.failure(err));
    if (err.response) {
      yield put(
        addNotification({
          title: 'Unauthorized!',
          message:
            'You have been logged out! Will redirect to login page in 2 seconds',
          level: 'error',
        }),
      );
      yield put(logoutAction());
      yield delay(2000);
      yield put(push(routes.auth.login));
    }
  }
}

function* watchCheckProfileRequest() {
  yield takeEvery(checkProfileAction.request, handleCheckProfile);
}

export function* saga() {
  yield all([fork(watchLoginRequest), fork(watchCheckProfileRequest)]);
}
