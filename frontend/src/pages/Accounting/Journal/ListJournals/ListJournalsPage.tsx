import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { push } from 'connected-react-router';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import * as R from 'ramda';

import * as routes from '@/config/routes';

import { ApplicationState } from '@/reducers';
import {
  getListOfJournalsFromAccounting,
  // getLoadingStatusCreateJournalFromAccounting,
} from '@/reducers/accounting';
import {
  IListJournalsState,
  // ICreateJournalState,
  getJournalsAction,
  deleteJournalAction,
  TransactionType,
} from '@/reducers/accounting/journals';

import { usePagination } from '@/hooks/usePagination';

import { PaginationMeta } from '@/utils/actions/async';
import { formatFullDate } from '@/utils/date';

export interface ListJournalProps {}

export const ListJournalsPage: React.FunctionComponent<ListJournalProps> = () => {
  const [idDeletion, toggleDeleteModal] = React.useState(-1);

  const dispatch = useDispatch();
  const getJournals = React.useCallback(
    (pagination: PaginationMeta) =>
      R.compose(dispatch, getJournalsAction.request)(undefined, pagination),
    [dispatch],
  );

  const listJournalsByTransactionState = useSelector(
    (state: ApplicationState) =>
      getListOfJournalsFromAccounting(state.accounting),
  ) as IListJournalsState;

  // const createJournalLoadingStatus = useSelector(
  //   (state: ApplicationState) =>
  //     getLoadingStatusCreateJournalFromAccounting(state),
  // ) as boolean;

  const pageCount = React.useMemo(
    () => listJournalsByTransactionState.pageCount,
    [listJournalsByTransactionState.pageCount],
  );

  const updateAction = React.useCallback(
    (transactionId: string) => () =>
      dispatch(
        push(`${routes.accounting.journal.list}/update/${transactionId}`),
      ),
    [dispatch],
  );

  const deleteAction = React.useCallback(
    () =>
      R.compose(dispatch, deleteJournalAction.request)(
        undefined,
        String(idDeletion),
      ),
    [dispatch, idDeletion],
  );

  // Deletion Modal
  const toggleModalOpen = React.useCallback(
    (id: number) => () => {
      toggleDeleteModal(prevState => (prevState === id ? -1 : id));
    },
    [toggleDeleteModal],
  );
  const closeModal = React.useCallback(() => toggleDeleteModal(-1), [
    toggleDeleteModal,
  ]);

  const {
    paginationState,
    changePage,
    // changeLimit,
  } = usePagination({
    paginationService: getJournals,
    page: 1,
    limit: 10,
    pageCount,
    triggerRefreshOnChange: [idDeletion],
  });

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
                  <tr>
                    <th colSpan={2} className="text-right">
                      Action
                    </th>
                    <td>
                      <Button
                        size="md"
                        color="info"
                        className="border-0"
                        block
                        onClick={updateAction(transaction.transactionId)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        size="md"
                        color="danger"
                        className="border-0"
                        block
                        onClick={toggleModalOpen(transaction.id)}
                      >
                        Delete
                      </Button>
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
      <Modal isOpen={idDeletion > -1}>
        <ModalHeader>Confirmation Dialog</ModalHeader>
        <ModalBody>
          Are you really sure to delete Transaction number : {idDeletion} ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModal}>
            Cancel
          </Button>
          <Button color="danger" onClick={deleteAction}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ListJournalsPage;
