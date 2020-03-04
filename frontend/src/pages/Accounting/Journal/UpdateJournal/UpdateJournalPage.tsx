import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as routes from '@/config/routes';

import { ApplicationState } from '@/reducers';
import { getListOfJournalsFromAccounting } from '@/reducers/accounting';
import { IListJournalsState } from '@/reducers/accounting/journals';

import { UpdateJournalForm } from './UpdateJournalForm';

export interface UpdateJournalProps {}

export const UpdateJournalPage: React.FunctionComponent<UpdateJournalProps> = () => {
  const { transactionId } = useParams();

  const listJournalTransactions = useSelector((state: ApplicationState) =>
    getListOfJournalsFromAccounting(state.accounting),
  ) as IListJournalsState;

  const transaction = listJournalTransactions.data.find(
    transaction => transaction.transactionId === transactionId,
  );

  if (!transaction) {
    return <Redirect to={routes.accounting.journal.list} />;
  }

  return <UpdateJournalForm transaction={transaction} />;
};

export default UpdateJournalPage;
