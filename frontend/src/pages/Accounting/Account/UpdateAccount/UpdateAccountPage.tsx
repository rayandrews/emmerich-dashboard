import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as routes from '@/config/routes';

import { ApplicationState } from '@/reducers';
import { getListOfAccountsFromAccounting } from '@/reducers/accounting';
import { IListAccountsState } from '@/reducers/accounting/accounts';

import { UpdateAccountForm } from './UpdateAccountForm';

export interface UpdateAccountProps {}

export const UpdateAccountPage: React.FunctionComponent<UpdateAccountProps> = () => {
  const { id } = useParams();

  const listAccounts = useSelector((state: ApplicationState) =>
    getListOfAccountsFromAccounting(state.accounting),
  ) as IListAccountsState;

  const account = listAccounts.data.find(account => account.id === Number(id));

  if (!account) {
    return <Redirect to={routes.accounting.account.list} />;
  }

  return <UpdateAccountForm account={account} />;
};

export default UpdateAccountPage;
