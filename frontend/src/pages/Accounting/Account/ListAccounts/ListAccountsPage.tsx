import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as R from 'ramda';

import { ListGroup, ListGroupItem, Collapse, Card, Table } from 'reactstrap';

import { ApplicationState } from '@/reducers';
import { getListOfAccountsFromAccounting } from '@/reducers/accounting';
import {
  Account,
  IListAccountsState,
  getAccountsAction,
} from '@/reducers/accounting/accounts';

import { constructTreeFromFlatArray } from '@/utils/tree';

export interface ListJournalPageProps {}

type AccountWithChildren = Account & {
  children: AccountWithChildren[];
};

const generateAccounts = (
  accounts: AccountWithChildren[] = [],
  activeId: number,
  toggleDetailCallback: (id: number) => () => void,
  level: number = 0,
) => {
  return (
    <>
      {accounts.map(account => {
        return (
          <div key={account.id}>
            <ListGroupItem
              tag="button"
              action
              active={activeId === account.id}
              onClick={toggleDetailCallback(account.id)}
              style={{
                paddingLeft: `${10 * level}px`,
              }}
            >
              {account.name}
            </ListGroupItem>
            <Collapse isOpen={activeId === account.id}>
              <Card>
                {/* <CardBody> */}
                <Table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{account.name}</td>
                    </tr>
                    <tr>
                      <th>Ledger</th>
                      <td>{account.ledger.name}</td>
                    </tr>
                    <tr>
                      <th>Currency</th>
                      <td>{account.currency}</td>
                    </tr>
                    <tr>
                      <th>Starting Balance</th>
                      <td>{account.startingBalance}</td>
                    </tr>
                    <tr>
                      <th>Balance</th>
                      <td>{account.balance}</td>
                    </tr>
                  </tbody>
                </Table>
                {/* </CardBody> */}
              </Card>
            </Collapse>
            <React.Fragment>
              {generateAccounts(
                account.children,
                activeId,
                toggleDetailCallback,
                level + 1,
              )}
            </React.Fragment>
          </div>
        );
      })}
    </>
  );
};

export const ListAccountsPage: React.FunctionComponent<ListJournalPageProps> = () => {
  const [isOpenDetail, toggleDetail] = React.useState(-1);

  const toggleDetailCallback = React.useCallback(
    (id: number) => () => {
      toggleDetail(prevState => (prevState === id ? -1 : id));
    },
    [toggleDetail],
  );

  const dispatch = useDispatch();
  const getAccounts = React.useCallback(
    (meta: string) =>
      R.compose(dispatch, getAccountsAction.request)(undefined, meta),
    [dispatch],
  );

  const listAccounts = useSelector((state: ApplicationState) =>
    getListOfAccountsFromAccounting(state.accounting),
  ) as IListAccountsState;

  React.useEffect(() => {
    getAccounts('');
    // eslint-disable-next-line
  }, [getAccounts]);

  return (
    <ListGroup style={{ flexGrow: 1 }}>
      {generateAccounts(
        constructTreeFromFlatArray(listAccounts),
        isOpenDetail,
        toggleDetailCallback,
      )}
    </ListGroup>
  );
};

export default ListAccountsPage;
