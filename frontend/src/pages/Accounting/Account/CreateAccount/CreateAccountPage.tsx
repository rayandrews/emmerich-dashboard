import React from 'react';
import { useDispatch } from 'react-redux';

import * as R from 'ramda';

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

  React.useEffect(() => {
    getAccounts('');
  }, [getAccounts]);

  return <CreateAccountForm />;
};

export default CreateAccountPage;
