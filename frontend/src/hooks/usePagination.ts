import React from 'react';

import { CreateQueryParams, QueryFilter } from '@nestjsx/crud-request';

interface IPagination extends CreateQueryParams {
  pageCount: number;
  paginationService: (state: CreateQueryParams) => void;
  triggerRefreshOnChange?: any[];
  filter?: QueryFilter[];
}

const defaultOptions = {
  page: 1,
  limit: 10,
  triggerRefreshOnChange: [],
  filter: [],
  pageCount: 0,
  paginationService: () => {},
};

export const usePagination = ({
  paginationService,
  page = 1,
  limit = 10,
  pageCount,
  triggerRefreshOnChange = [],
  filter = [],
}: IPagination = defaultOptions) => {
  const [currentPage, setPage] = React.useState(page);
  const [currentLimit, setLimit] = React.useState(limit);

  const changePage = React.useCallback(
    (page: number) => () => {
      setPage(page % (pageCount + 1));
    },
    [setPage, pageCount],
  );

  const changeLimit = React.useCallback(
    (limit: number) => () => {
      setLimit(limit);
    },
    [setLimit],
  );

  React.useEffect(() => {
    paginationService({
      page: currentPage,
      limit: currentLimit,
      filter,
    });
  }, [paginationService, currentLimit, currentPage, ...triggerRefreshOnChange]);

  return {
    currentPage,
    currentLimit,
    changePage,
    changeLimit,
    paginationState: {
      page: currentPage,
      limit: currentLimit,
    },
  };
};
