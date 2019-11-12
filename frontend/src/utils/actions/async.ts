import { createAsyncAction as baseCreateAsyncAction } from 'typesafe-actions';

export interface PaginationMeta {
  page?: number;
  limit?: number;
}

export function createAsyncPaginationAction<
  Payload,
  Response,
  Meta extends PaginationMeta = PaginationMeta
>(request: string, success: string, failure: string) {
  return baseCreateAsyncAction(request, success, failure)<
    [Payload, Meta],
    Response,
    Error
  >();
}
