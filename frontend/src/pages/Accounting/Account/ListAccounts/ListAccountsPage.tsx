import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { push } from 'connected-react-router';

import * as R from 'ramda';

import {
  ListGroup,
  ListGroupItem,
  Collapse,
  Card,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import * as routes from '@/config/routes';
import { ApplicationState } from '@/reducers';
import { getListOfAccountsFromAccounting } from '@/reducers/accounting';
import {
  Account,
  IListAccountsState,
  getAccountsAction,
  deleteAccountAction,
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
  updateAction: (id: number) => () => void,
  deleteAction: (id: number) => () => void,
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
                      <th>Type</th>
                      <td>{account.type}</td>
                    </tr>
                    <tr>
                      <th>Currency</th>
                      <td>{account.currency}</td>
                    </tr>
                    <tr>
                      <th>Starting Debit</th>
                      <td>{account.startingDebit}</td>
                    </tr>
                    <tr>
                      <th>Starting Credit</th>
                      <td>{account.startingCredit}</td>
                    </tr>
                    <tr>
                      <th>Balance</th>
                      <td>{account.balance}</td>
                    </tr>
                    <tr>
                      <th>Action</th>
                      <td>
                        <Button
                          size="md"
                          color="info"
                          className="border-0"
                          block
                          onClick={updateAction(account.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="md"
                          color="danger"
                          className="border-0"
                          block
                          onClick={deleteAction(account.id)}
                        >
                          Delete
                        </Button>
                      </td>
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
                updateAction,
                deleteAction,
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
  const [idDeletion, toggleDeleteModal] = React.useState(-1);
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
  }, [getAccounts, idDeletion]);

  const toggleModalOpen = React.useCallback(
    (id: number) => () => {
      toggleDeleteModal(prevState => (prevState === id ? -1 : id));
    },
    [toggleDeleteModal],
  );

  const closeModal = React.useCallback(() => toggleDeleteModal(-1), [
    toggleDeleteModal,
  ]);

  const updateAction = React.useCallback(
    (id: number) => () =>
      dispatch(push(`${routes.accounting.account.list}/update/${id}`)),
    [dispatch],
  );

  const deleteAction = React.useCallback(
    () =>
      R.compose(dispatch, deleteAccountAction.request)(
        undefined,
        String(idDeletion),
      ),
    [dispatch, idDeletion],
  );

  return (
    <>
      <ListGroup style={{ flexGrow: 1 }}>
        {generateAccounts(
          constructTreeFromFlatArray(listAccounts),
          isOpenDetail,
          toggleDetailCallback,
          updateAction,
          toggleModalOpen,
        )}
      </ListGroup>
      <Modal isOpen={idDeletion > -1}>
        <ModalHeader>Confirmation Dialog</ModalHeader>
        <ModalBody>
          Are you really sure to delete Account number : {idDeletion} ?
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

export default ListAccountsPage;
