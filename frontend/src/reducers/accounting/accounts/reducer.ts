import { combineReducers, Reducer } from 'redux';
import { createReducer, ActionType } from 'typesafe-actions';

import produce, { Draft } from 'immer';

import { isLoading, isError } from '@/utils/reducers';

import {
  State,
  IListAccountsState,
  ICreateAccountState,
  IUpdateAccountState,
} from './types';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

// Modules
// 1. List all accounts
const listAccountsInitialState: IListAccountsState = [];
const isLoadingListAccounts = isLoading(actions.getAccountsAction);
const isErrorListAccounts = isError(actions.getAccountsAction.failure);
const listAccounts = createReducer<IListAccountsState, Action>(
  listAccountsInitialState,
).handleAction(
  actions.getAccountsAction.success,
  produce(
    (
      state: Draft<IListAccountsState>,
      action: ActionType<typeof actions.getAccountsAction.success>,
    ) => {
      return action.payload;
    },
  ),
);
const listAccountsReducer = combineReducers({
  loading: isLoadingListAccounts,
  state: listAccounts,
  error: isErrorListAccounts,
});
// End of list all accounts

// 2. Create account entries
const createAccountInitialState: ICreateAccountState = {};
const isLoadingCreateAccount = isLoading(actions.createAccountAction);
const isErrorCreateAccount = isError(actions.createAccountAction.failure);
const createAccount = createReducer<ICreateAccountState, Action>(
  createAccountInitialState,
).handleAction(
  actions.createAccountAction.success,
  produce(
    (
      state: Draft<ICreateAccountState>,
      action: ActionType<typeof actions.createAccountAction.success>,
    ) => {
      return action.payload;
    },
  ),
);
const createAccountReducer = combineReducers({
  loading: isLoadingCreateAccount,
  state: createAccount,
  error: isErrorCreateAccount,
});
// End of create account

// 3. Update account entries
const updateAccountInitialState: IUpdateAccountState = {};
const isLoadingUpdateAccount = isLoading(actions.updateAccountAction);
const isErrorUpdateAccount = isError(actions.updateAccountAction.failure);
const updateAccount = createReducer<IUpdateAccountState, Action>(
  updateAccountInitialState,
).handleAction(
  actions.updateAccountAction.success,
  produce(
    (
      state: Draft<IUpdateAccountState>,
      action: ActionType<typeof actions.updateAccountAction.success>,
    ) => {
      return action.payload;
    },
  ),
);
const updateAccountReducer = combineReducers({
  loading: isLoadingUpdateAccount,
  state: updateAccount,
  error: isErrorUpdateAccount,
});
// End of list all accounts

// 4. Delete account entries
// const deleteAccountInitialState: IUpdateAccountState = {};
// const isLoadingUpdateAccount = isLoading(actions.updateAccountAction);
// const isErrorUpdateAccount = isError(actions.updateAccountAction.failure);
// const updateAccount = createReducer<IUpdateAccountState, Action>(
//   updateAccountInitialState,
// ).handleAction(
//   actions.updateAccountAction.success,
//   produce(
//     (
//       state: Draft<IUpdateAccountState>,
//       action: ActionType<typeof actions.updateAccountAction.success>,
//     ) => {
//       return action.payload;
//     },
//   ),
// );
// const updateAccountReducer = combineReducers({
//   loading: isLoadingUpdateAccount,
//   state: updateAccount,
//   error: isErrorUpdateAccount,
// });
// End of list all accounts

export const reducer: Reducer<State, Action> = combineReducers({
  list: listAccountsReducer,
  create: createAccountReducer,
  update: updateAccountReducer,
});
