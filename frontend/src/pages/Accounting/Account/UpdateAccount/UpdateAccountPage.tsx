import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as routes from '@/config/routes';

import { ApplicationState } from '@/reducers';
import { getListOfAccountsFromAccounting } from '@/reducers/accounting';
import {
  getAccountsAction,
  IListAccountsState,
} from '@/reducers/accounting/accounts';

import { UpdateAccountForm } from './UpdateAccountForm';

export interface UpdateAccountProps {}

export const UpdateAccountPage: React.FunctionComponent<UpdateAccountProps> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const listAccounts = useSelector((state: ApplicationState) =>
    getListOfAccountsFromAccounting(state.accounting),
  ) as IListAccountsState;
  // const getAccounts = React.useCallback(
  //   (meta: string) =>
  //     R.compose(dispatch, getAccountsAction.request)(undefined, meta),
  //   [dispatch],
  // );

  // React.useEffect(() => {
  //   getAccounts('');
  // }, [getAccounts]);

  const account = listAccounts.find(account => account.id === Number(id));

  if (!account) {
    return <Redirect to={routes.accounting.account.list} />;
  }

  return <UpdateAccountForm account={account} />;
};

export default UpdateAccountPage;
