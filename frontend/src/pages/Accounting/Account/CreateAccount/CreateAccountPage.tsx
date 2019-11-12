import React from 'react';
import { useDispatch } from 'react-redux';

import * as R from 'ramda';

import { getLedgersAction } from '@/reducers/accounting/ledgers';
import { getAccountsAction } from '@/reducers/accounting/accounts';

import { CreateAccountForm } from './CreateAccountForm';

export interface CreateAccountPageProps {}

export const CreateAccountPage: React.FunctionComponent<CreateAccountPageProps> = () => {
  const dispatch = useDispatch();
  const getAccounts = React.useCallback(
    (meta: string) =>
      R.compose(dispatch, getAccountsAction.request)(undefined, meta),
    [dispatch],
  );

  const getLedger = React.useCallback(
    R.compose(dispatch, getLedgersAction.request),
    [dispatch],
  );

  React.useEffect(() => {
    getAccounts('');
  }, [getAccounts]);

  React.useEffect(() => {
    getLedger();
  }, [getLedger]);

  return (
    <>
      <CreateAccountForm />
    </>
  );
};

export default CreateAccountPage;
