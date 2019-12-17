import * as R from 'ramda';

import { AxiosPromise, AxiosError } from 'axios';

import { RequestQueryBuilder } from '@nestjsx/crud-request';

import { call } from 'typed-redux-saga';
import { put, delay } from 'redux-saga/effects';

import { addNotification } from '@/reducers/app';

interface ApiOptions {
  showSuccess?: boolean;
  showFailure?: boolean;
  actionCallback?: any;
}

const defaultOptions: ApiOptions = {
  showSuccess: false,
  showFailure: true,
};

export function createApi<A, B, C extends any>(
  api: (payload: A, meta: string) => AxiosPromise<B>,
  actions: C,
  options: ApiOptions = defaultOptions,
) {
  return function*(request: ReturnType<C['request']> | any) {
    try {
      let meta = request.meta;

      if (!R.is(String, request.meta)) {
        meta = request.meta
          ? RequestQueryBuilder.create(request.meta).query()
          : '';
      }

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

      if (options.actionCallback) {
        yield delay(500);
        yield put(options.actionCallback);
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
