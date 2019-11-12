import React from 'react';

import * as R from 'ramda';

import { useDispatch, useSelector } from 'react-redux';

import { ApplicationState } from '@/reducers';
import { getListOfLedgersFromAccounting } from '@/reducers/accounting';
import {
  getLedgersAction,
  IListLedgersState,
} from '@/reducers/accounting/ledgers';

import { Table, Column } from '@/components/Table';

export interface ListLedgersPageProps {}

export const ListLedgersPage: React.FunctionComponent<ListLedgersPageProps> = () => {
  const dispatch = useDispatch();
  const getLedgers = React.useCallback(
    R.compose(dispatch, getLedgersAction.request),
    [dispatch],
  );

  const listLedgers = useSelector((state: ApplicationState) =>
    getListOfLedgersFromAccounting(state.accounting),
  ) as IListLedgersState;

  const columns = React.useMemo(
    () =>
      [
        {
          Header: 'ID',
          accessor: 'id',
        },
        {
          Header: 'Name',
          accessor: 'name',
        },
        {
          Header: 'Type',
          accessor: 'type',
        },
        {
          Header: 'Created At',
          accessor: 'createdAt',
        },
        {
          Header: 'Updated At',
          accessor: 'updatedAt',
        },
      ] as Column[],
    [],
  );

  React.useEffect(() => {
    getLedgers();
  }, [getLedgers]);

  return <Table name="listLedger" columns={columns} data={listLedgers} />;
};

export default ListLedgersPage;
