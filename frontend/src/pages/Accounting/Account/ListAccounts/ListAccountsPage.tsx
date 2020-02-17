import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { push } from 'connected-react-router';

import { useTranslation } from 'react-i18next';

import * as R from 'ramda';

import {
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
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
  getSpecificAccountAction,
  deleteAccountAction,
} from '@/reducers/accounting/accounts';

import { usePagination } from '@/hooks/usePagination';

import { capitalize } from '@/utils/string';
import { ApiMeta } from '@/utils/actions/async';

export interface ListJournalPageProps {}

// const generateAccounts = (
//   accounts: Account[] = [],
//   activeId: number,
//   toggleDetailCallback: (id: number) => () => void,
//   updateAction: (id: number) => () => void,
//   deleteAction: (id: number) => () => void,
//   level: number = 0,
// ) => {
//   return (
//     <>
//       {accounts.map(account => {
//         return (
//           <div key={account.id}>
//             <ListGroupItem
//               tag="button"
//               action
//               active={activeId === account.id}
//               onClick={toggleDetailCallback(account.id)}
//               style={{
//                 paddingLeft: `${10 * level}px`,
//               }}
//             >
//               {account.name}
//             </ListGroupItem>
//             <Collapse isOpen={activeId === account.id}>
//               <Card>
//                 <Table>
//                   <tbody>
//                     <tr>
//                       <th>Name</th>
//                       <td>{account.name}</td>
//                     </tr>
//                     <tr>
//                       <th>Type</th>
//                       <td>{account.type}</td>
//                     </tr>
//                     <tr>
//                       <th>Currency</th>
//                       <td>{account.currency}</td>
//                     </tr>
//                     <tr>
//                       <th>Starting Debit</th>
//                       <td>{account.startingDebit}</td>
//                     </tr>
//                     <tr>
//                       <th>Starting Credit</th>
//                       <td>{account.startingCredit}</td>
//                     </tr>
//                     <tr>
//                       <th>Balance</th>
//                       <td>{account.balance}</td>
//                     </tr>
//                     <tr>
//                       <th>Children</th>
//                       <td>{account.children ? account.children.length : 0}</td>
//                     </tr>
//                     <tr>
//                       <th>Action</th>
//                       <td>
//                         <Button
//                           size="md"
//                           color="info"
//                           className="border-0"
//                           block
//                           onClick={updateAction(account.id)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           size="md"
//                           color="danger"
//                           className="border-0"
//                           block
//                           onClick={deleteAction(account.id)}
//                         >
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </Card>
//             </Collapse>
//             <React.Fragment>
//               {generateAccounts(
//                 account.children,
//                 activeId,
//                 toggleDetailCallback,
//                 updateAction,
//                 deleteAction,
//                 level + 1,
//               )}
//             </React.Fragment>
//           </div>
//         );
//       })}
//     </>
//   );
// };

const generateAccountsTable = (
  accounts: Account[] = [],
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
          <React.Fragment key={account.id}>
            <tr onClick={toggleDetailCallback(account.id)}>
              <th scope="row">{account.id}</th>
              <td
                style={{
                  paddingLeft: `${10 * level}px`,
                }}
              >
                {account.name}
              </td>
              <td>{capitalize(account.type)}</td>
              <td>{account.startingDebit}</td>
              <td>{account.startingCredit}</td>
              <td>{account.balance}</td>
            </tr>
            {generateAccountsTable(
              account.children,
              activeId,
              toggleDetailCallback,
              updateAction,
              deleteAction,
              level + 1,
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export const ListAccountsPage: React.FunctionComponent<ListJournalPageProps> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('accounting');

  const [idDeletion, toggleDeleteModal] = React.useState(-1);
  const [isOpenDetail, toggleDetail] = React.useState(-1);

  const getAccounts = React.useCallback(
    (pagination: ApiMeta) =>
      R.compose(dispatch, getAccountsAction.request)(undefined, pagination),
    [dispatch],
  );

  const getSpecificAccount = React.useCallback(
    (id: number) =>
      R.compose(dispatch, getSpecificAccountAction.request)(
        undefined,
        String(id),
      ),
    [dispatch],
  );

  const toggleDetailCallback = React.useCallback(
    (id: number) => () => {
      toggleDetail(prevState => (prevState === id ? -1 : id));
    },
    [toggleDetail],
  );

  const listAccounts = useSelector((state: ApplicationState) =>
    getListOfAccountsFromAccounting(state.accounting),
  ) as IListAccountsState;

  const pageCount = React.useMemo(() => listAccounts.pageCount, [
    listAccounts.pageCount,
  ]);

  React.useEffect(() => {
    if (isOpenDetail !== -1) getSpecificAccount(isOpenDetail);
  }, [getSpecificAccount, isOpenDetail]);

  const {
    paginationState,
    changePage,
    // changeLimit,
  } = usePagination({
    paginationService: getAccounts,
    page: 1,
    limit: 10,
    pageCount,
    triggerRefreshOnChange: [idDeletion],
  });

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
      <Table responsive striped borderless hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t('account.name.label')}</th>
            <th>{t('account.type.label')}</th>
            <th>{t('account.startingDebit.label')}</th>
            <th>{t('account.startingCredit.label')}</th>
            <th>{t('account.balance.label')}</th>
          </tr>
        </thead>
        <tbody>
          {generateAccountsTable(
            listAccounts.data,
            isOpenDetail,
            toggleDetailCallback,
            updateAction,
            toggleModalOpen,
          )}
        </tbody>
      </Table>

      <Pagination aria-label="Journal Navigation">
        <PaginationItem disabled={paginationState.page <= 1}>
          <PaginationLink first href="#" onClick={changePage(1)} />
        </PaginationItem>
        <PaginationItem disabled={paginationState.page <= 1}>
          <PaginationLink
            previous
            href="#"
            onClick={changePage(paginationState.page - 1)}
          />
        </PaginationItem>
        <PaginationItem
          disabled={paginationState.page === listAccounts.pageCount}
        >
          <PaginationLink
            next
            href="#"
            onClick={changePage(paginationState.page + 1)}
          />
        </PaginationItem>
        <PaginationItem
          disabled={paginationState.page === listAccounts.pageCount}
        >
          <PaginationLink
            last
            href="#"
            onClick={changePage(listAccounts.pageCount)}
          />
        </PaginationItem>
      </Pagination>
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
