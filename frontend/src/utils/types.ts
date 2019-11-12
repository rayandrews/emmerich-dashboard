import React from 'react';

export type ExtractProps<
  TComponentOrTProps
> = TComponentOrTProps extends React.ComponentType<infer TProps>
  ? TProps
  : TComponentOrTProps;

export interface PaginationResponse<T extends object> {
  data: T[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export function createDefaultPaginationState<
  T extends object
>(): PaginationResponse<T> {
  return {
    data: [] as T[],
    count: 0,
    total: 0,
    page: 0,
    pageCount: 0,
  };
}
