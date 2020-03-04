import { createAsyncAction as baseCreateAsyncAction } from 'typesafe-actions';

import { CreateQueryParams } from '@nestjsx/crud-request';

export type ApiMeta = CreateQueryParams;

export function createAsyncPaginationAction<
  Payload,
  Response,
  Meta extends ApiMeta = ApiMeta
>(request: string, success: string, failure: string) {
  return baseCreateAsyncAction(request, success, failure)<
    [Payload, Meta],
    Response,
    Error
  >();
}
