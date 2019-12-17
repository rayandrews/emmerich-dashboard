import React from 'react';

interface PaginationState {
  page: number;
  limit: number;
}

interface IPagination extends PaginationState {
  pageCount: number;
  paginationService: (state: PaginationState) => void;
  triggerRefreshOnChange?: any[];
}

export const usePagination = ({
  paginationService,
  page,
  limit,
  pageCount,
  triggerRefreshOnChange = [],
}: IPagination) => {
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
