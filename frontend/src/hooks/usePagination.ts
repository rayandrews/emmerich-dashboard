import React from 'react';

interface IPagination {
  page: number;
  limit: number;
  pageCount: number;
}

export const usePagination = ({ page, limit, pageCount }: IPagination) => {
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
