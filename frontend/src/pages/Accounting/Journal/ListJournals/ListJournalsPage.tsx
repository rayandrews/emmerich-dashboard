import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

import * as R from 'ramda';

import { ApplicationState } from '@/reducers';
import { getListOfJournalsFromAccounting } from '@/reducers/accounting';
import {
  IListJournalsState,
  getJournalsAction,
  TransactionType,
} from '@/reducers/accounting/journals';

import { usePagination } from '@/hooks/usePagination';

import { formatFullDate } from '@/utils/date';

export interface ListJournalProps {}

export const ListJournalsPage: React.FunctionComponent<ListJournalProps> = () => {
  const dispatch = useDispatch();
  const getJournals = React.useCallback(
    R.compose(dispatch, getJournalsAction.request),
    [dispatch],
  );
  const listJournalsByTransactionState = useSelector(
    (state: ApplicationState) =>
      getListOfJournalsFromAccounting(state.accounting),
  ) as IListJournalsState;

  const pageCount = React.useMemo(
    () => listJournalsByTransactionState.pageCount,
    [listJournalsByTransactionState.pageCount],
  );

  const {
    paginationState,
    changePage,
    // changeLimit,
  } = usePagination({
    page: 1,
    limit: 10,
    pageCount,
  });

  React.useEffect(() => {
    getJournals(undefined, paginationState);
  }, [getJournals, paginationState]);

  return (
    <>
      {listJournalsByTransactionState.data.map(transaction => {
        const transactionJournals = transaction.journals;

        const [debit, credit] = (transactionJournals || []).reduce(
          ([debit, credit], journal) => {
            switch (journal.type) {
              case TransactionType.DEBIT:
                debit += Number(journal.amount);
                break;

              default:
                credit += Number(journal.amount);
                break;
            }

            return [debit, credit];
          },
          [0, 0],
        );

        return (
          <Card key={transaction.transactionId} className="my-3">
            <CardHeader>
              <b>
                Transaction ID{' '}
                <span className="float-right">{transaction.transactionId}</span>
              </b>
              {transactionJournals.length > 0 && (
                <>
                  <br />
                  <span>
                    Created at{' '}
                    <span className="float-right">
                      {formatFullDate(
                        new Date(transactionJournals[0].createdAt),
                      )}
                    </span>
                  </span>
                </>
              )}
            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Description</th>
                    <th className="text-center">Debit</th>
                    <th className="text-center">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionJournals.map((item, idx) => {
                    const transactionAmount = item.amount;

                    return (
                      <tr key={item.id}>
                        <th scope="row">{idx}</th>
                        <td>{item.memo}</td>
                        <td className="d-flex justify-content-between">
                          <p>{item.currency}</p>
                          <p>
                            {item.type === TransactionType.CREDIT
                              ? transactionAmount
                              : 0}
                          </p>
                        </td>
                        <td>
                          <p className="float-left">{item.currency}</p>
                          <p className="float-right">
                            {item.type === TransactionType.DEBIT
                              ? transactionAmount
                              : 0}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <th colSpan={2} className="text-right">
                      Total
                    </th>
                    <td>
                      <p className="float-left font-weight-bold">IDR</p>
                      <p className="float-right font-weight-bold">{credit}</p>
                    </td>
                    <td>
                      <p className="float-left font-weight-bold">IDR</p>
                      <p className="float-right font-weight-bold">{debit}</p>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        );
      })}

      <Pagination aria-label="Journal Navigation">
        <PaginationItem disabled={paginationState.page <= 1}>
          <PaginationLink first href="#" onClick={changePage(1)} />
        </PaginationItem>
        <PaginationItem disabled={paginationState.page <= 1}>
          <PaginationLink
            previous
            href="#"
            onClick={changePage(paginationState.page - 1)}
          />
        </PaginationItem>
        <PaginationItem
          disabled={
            paginationState.page === listJournalsByTransactionState.pageCount
          }
        >
          <PaginationLink
            next
            href="#"
            onClick={changePage(paginationState.page + 1)}
          />
        </PaginationItem>
        <PaginationItem
          disabled={
            paginationState.page === listJournalsByTransactionState.pageCount
          }
        >
          <PaginationLink
            last
            href="#"
            onClick={changePage(listJournalsByTransactionState.pageCount)}
          />
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default ListJournalsPage;
