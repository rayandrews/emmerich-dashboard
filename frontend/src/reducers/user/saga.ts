import { takeEvery, fork, all } from 'redux-saga/effects';

import { createApi } from '@/utils/sagas/api';

import { createUserAction, createUserWithLoginAction } from './actions';
import { createUserService, createUserWithLoginService } from './service';

// 1. Create user
// export function* handleCreateUser(
//   action: ReturnType<typeof createUserAction.request>,
// ): Generator {
//   const response = yield* call(createUserService, action.payload);

//   try {
//     yield put(createUserAction.success(response.data));
//   } catch (err) {
//     yield put(createUserAction.failure(err));
//   }
// }

function* handleCreateUserRequest() {
  yield takeEvery(
    createUserAction.request,
    createApi(createUserService, createUserAction),
  );
}
// End create user

// 2. Create user with login
// export function* handleCreateUserWithLogin(
//   action: ReturnType<typeof createUserWithLoginAction.request>,
// ): Generator {
//   const response = yield* call(createUserWithLoginService, action.payload);

//   try {
//     yield put(createUserWithLoginAction.success(response.data));
//   } catch (err) {
//     yield put(createUserWithLoginAction.failure(err));
//   }
// }

function* watchCreateUserWithLoginRequest() {
  yield takeEvery(
    createUserWithLoginAction.request,
    createApi(createUserWithLoginService, createUserWithLoginAction),
  );
}
// End create user with login

export function* saga() {
  yield all([
    fork(handleCreateUserRequest),
    fork(watchCreateUserWithLoginRequest),
  ]);
}
