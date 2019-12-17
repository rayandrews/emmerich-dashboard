import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as R from 'ramda';

import * as routes from '@/config/routes';

import { ApplicationState } from '@/reducers';
import { getListOfJournalsFromAccounting } from '@/reducers/accounting';
import { getAccountsAction } from '@/reducers/accounting/accounts';
import { IListJournalsState } from '@/reducers/accounting/journals';

import { UpdateJournalForm } from './UpdateJournalForm';

export interface UpdateJournalProps {}

export const UpdateJournalPage: React.FunctionComponent<UpdateJournalProps> = () => {
  const { transactionId } = useParams();
  const dispatch = useDispatch();

  const listJournalTransactions = useSelector((state: ApplicationState) =>
    getListOfJournalsFromAccounting(state.accounting),
  ) as IListJournalsState;

  const transaction = listJournalTransactions.data.find(
    transaction => transaction.transactionId === transactionId,
  );

  const getAccounts = React.useCallback(
    (meta: string) =>
      R.compose(dispatch, getAccountsAction.request)(undefined, meta),
    [dispatch],
  );

  React.useEffect(() => {
    getAccounts('');
  }, [getAccounts]);

  if (!transaction) {
    return <Redirect to={routes.accounting.journal.list} />;
  }

  return <UpdateJournalForm transaction={transaction} />;
};

export default UpdateJournalPage;
