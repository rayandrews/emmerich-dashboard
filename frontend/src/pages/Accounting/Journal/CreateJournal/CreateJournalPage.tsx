import React from 'react';
import { useDispatch } from 'react-redux';

import * as R from 'ramda';

import { getAccountsAction } from '@/reducers/accounting/accounts';

import { CreateJournalForm } from './CreateJournalForm';

export interface CreateJournalProps {}

export const CreateJournalPage: React.FunctionComponent<CreateJournalProps> = () => {
  const dispatch = useDispatch();
  const getAccounts = React.useCallback(
    () => R.compose(dispatch, getAccountsAction.request)(undefined, ''),
    [dispatch],
  );

  React.useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  return (
    <>
      <CreateJournalForm />
    </>
  );
};

export default CreateJournalPage;
