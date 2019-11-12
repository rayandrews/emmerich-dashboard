import { AxiosPromise, AxiosError } from 'axios';

import { RequestQueryBuilder } from '@nestjsx/crud-request';

import { call } from 'typed-redux-saga';
import { put } from 'redux-saga/effects';

import { addNotification } from '@/reducers/app';

interface ApiOptions {
  showSuccess: boolean;
  showFailure: boolean;
}

const defaultOptions: ApiOptions = {
  showSuccess: false,
  showFailure: true,
};

export function createApi<A, B, C extends any>(
  api: (payload: A, meta: string) => AxiosPromise<B>,
  actions: C,
  options = defaultOptions,
) {
  return function*(request: ReturnType<C['request']> | any) {
    try {
      const meta: string = request.meta
        ? RequestQueryBuilder.create(request.meta).query()
        : '';

      const response = yield* call(api, request.payload, meta);
      yield put(actions.success(response.data));
      if (options.showSuccess) {
        yield put(
          addNotification({
            title: 'Request Succeed!',
            level: 'success',
          }),
        );
      }
    } catch (_err) {
      const err = _err as AxiosError;
      yield put(actions.failure(err));
      if (err.response && options.showFailure) {
        yield put(
          addNotification({
            title: 'Request Error',
            message: err.response.data.message,
            level: 'error',
          }),
        );
      }
    }
  };
}
