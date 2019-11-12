import { combineReducers, Reducer } from 'redux';
import { createReducer, ActionType } from 'typesafe-actions';

import produce, { Draft } from 'immer';

import { isLoading, isError } from '@/utils/reducers';

import {
  State,
  IListLedgersState,
  ICreateLedgerState,
  IUpdateLedgerState,
} from './types';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

// Modules
// 1. List all ledgers
const listLedgersInitialState: IListLedgersState = [];
const isLoadingListLedgers = isLoading(actions.getLedgersAction);
const isErrorListLedgers = isError(actions.getLedgersAction.failure);
const listLedgers = createReducer<IListLedgersState, Action>(
  listLedgersInitialState,
).handleAction(
  actions.getLedgersAction.success,
  produce(
    (
      state: Draft<IListLedgersState>,
      action: ActionType<typeof actions.getLedgersAction.success>,
    ) => {
      return action.payload;
    },
  ),
);
const listLedgersReducer = combineReducers({
  loading: isLoadingListLedgers,
  state: listLedgers,
  error: isErrorListLedgers,
});
// End of list all ledgers

// 2. Create ledger entries
const createLedgerInitialState: ICreateLedgerState = {};
const isLoadingCreateLedger = isLoading(actions.createLedgerAction);
const isErrorCreateLedger = isError(actions.createLedgerAction.failure);
const createLedger = createReducer<ICreateLedgerState, Action>(
  createLedgerInitialState,
).handleAction(
  actions.createLedgerAction.success,
  produce(
    (
      state: Draft<ICreateLedgerState>,
      action: ActionType<typeof actions.createLedgerAction.success>,
    ) => {
      return action.payload;
    },
  ),
);
const createLedgerReducer = combineReducers({
  loading: isLoadingCreateLedger,
  state: createLedger,
  error: isErrorCreateLedger,
});
// End of create ledger

// 3. Update ledger entries
const updateLedgerInitialState: IUpdateLedgerState = {};
const isLoadingUpdateLedger = isLoading(actions.updateLedgerAction);
const isErrorUpdateLedger = isError(actions.updateLedgerAction.failure);
const updateLedger = createReducer<IUpdateLedgerState, Action>(
  updateLedgerInitialState,
).handleAction(
  actions.updateLedgerAction.success,
  produce(
    (
      state: Draft<IUpdateLedgerState>,
      action: ActionType<typeof actions.updateLedgerAction.success>,
    ) => {
      return action.payload;
    },
  ),
);
const updateLedgerReducer = combineReducers({
  loading: isLoadingUpdateLedger,
  state: updateLedger,
  error: isErrorUpdateLedger,
});
// End of list all ledgers

// 4. Delete ledger entries
// const deleteLedgerInitialState: IUpdateLedgerState = {};
// const isLoadingUpdateLedger = isLoading(actions.deleteLedgerAction);
// const isErrorUpdateLedger = isError(actions.deleteLedgerAction.failure);
// const updateLedger = createReducer<IUpdateLedgerState, Action>(
//   updateLedgerInitialState,
// ).handleAction(
//   actions.deleteLedgerAction.success,
//   produce(
//     (
//       state: Draft<IUpdateLedgerState>,
//       action: ActionType<typeof actions.deleteLedgerAction.success>,
//     ) => {
//       return action.payload;
//     },
//   ),
// );
// const updateLedgerReducer = combineReducers({
//   loading: isLoadingUpdateLedger,
//   state: updateLedger,
//   error: isErrorUpdateLedger,
// });
// End of list all ledgers

export const reducer: Reducer<State, Action> = combineReducers({
  list: listLedgersReducer,
  create: createLedgerReducer,
  update: updateLedgerReducer,
});
