import { combineReducers, Reducer } from 'redux';
import { createReducer, ActionType } from 'typesafe-actions';

import produce, { Draft } from 'immer';

import { isLoading, isError } from '@/utils/reducers';
import { createDefaultPaginationState } from '@/utils/types';

import { State, IListJournalsState, ICreateJournalState } from './types';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

// Modules
// 1. List all journals
const listJournalsInitialState: IListJournalsState = createDefaultPaginationState();
const isLoadingListJournals = isLoading(actions.getJournalsAction);
const isErrorListJournals = isError(actions.getJournalsAction.failure);
const listJournals = createReducer<IListJournalsState, Action>(
  listJournalsInitialState,
).handleAction(
  actions.getJournalsAction.success,
  produce(
    (
      state: Draft<IListJournalsState>,
      action: ActionType<typeof actions.getJournalsAction.success>,
    ) => {
      return action.payload;
    },
  ),
);
const listJournalsReducer = combineReducers({
  loading: isLoadingListJournals,
  state: listJournals,
  error: isErrorListJournals,
});
// End of list all journals

// 2. Create journal entries
const createJournalInitialState: ICreateJournalState = [];
const isLoadingCreateJournal = isLoading(actions.createJournalAction);
const isErrorCreateJournal = isError(actions.createJournalAction.failure);
const createJournal = createReducer<ICreateJournalState, Action>(
  createJournalInitialState,
).handleAction(
  actions.createJournalAction.success,
  produce(
    (
      state: Draft<ICreateJournalState>,
      action: ActionType<typeof actions.createJournalAction.success>,
    ) => {
      return action.payload;
    },
  ),
);
const createJournalReducer = combineReducers({
  loading: isLoadingCreateJournal,
  state: createJournal,
  error: isErrorCreateJournal,
});
// End of list all journals

export const reducer: Reducer<State, Action> = combineReducers({
  list: listJournalsReducer,
  create: createJournalReducer,
});
