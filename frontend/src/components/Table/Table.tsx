import React from 'react';
import PropTypes from '@/utils/propTypes';

import {
  Container,
  Table as BaseTable,
  TableProps as BaseTableProps,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';

import { useTable, usePagination, useSortBy } from 'react-table';

import { Avatar } from '@/components/Avatar';

import { withBadge } from '@/hocs/withBadge';

export const AvatarWithBadge = withBadge({
  position: 'bottom-right',
  color: 'success',
})(Avatar);

export interface Column {
  Header: string;
  accessor?: string;
  columns?: Column[];
}

export interface TableProps<T extends object> extends BaseTableProps {
  name: string;
  columns: Column[];
  data: T[];
}

export function Table<T extends object = {}>({
  name,
  columns,
  data,
  ...restProps
}: TableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    // canPreviousPage,
    // canNextPage,
    // pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
  }: // setPageSize,
  // state: { pageIndex, pageSize },
  any = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  );

  return (
    <Container>
      <BaseTable responsive hover {...getTableProps()} {...restProps}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <MdArrowDownward />
                      ) : (
                        <MdArrowUpward />
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BaseTable>
      <Pagination aria-label={`${name}-pagination`}>
        <PaginationItem disabled>
          <PaginationLink first href="#" onClick={gotoPage} />
        </PaginationItem>
        <PaginationItem disabled>
          <PaginationLink previous href="#" onClick={previousPage} />
        </PaginationItem>
        {/* <PaginationItem active>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem> */}
        <PaginationItem>
          <PaginationLink next href="#" onClick={nextPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            last
            href="#"
            onClick={() => gotoPage(pageCount - 1)}
          />
        </PaginationItem>
      </Pagination>
    </Container>
  );
}

Table.propTypes = {
  name: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
} as React.WeakValidationMap<TableProps<{}>>;
