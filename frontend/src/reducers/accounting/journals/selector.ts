import { createSelector } from 'reselect';
import * as R from 'ramda';

import { State, IListJournalsState, ICreateJournalState } from './types';

// 1. List of journals selector
export const getListOfJournalsState = createSelector(
  R.path<State['list']>(['list']),
  R.identity,
);

export const getListOfJournals = createSelector(
  getListOfJournalsState,
  R.path<IListJournalsState>(['state']),
);

// export const getListOfJournals = createSelector(
//   getListOfJournalsWrapper,
//   R.path<IListJournalsState['data']>(['data']),
// );
// end of list of journals selector

// 2. Create journal selector
export const getCreateJournalState = createSelector(
  R.path<State['create']>(['create']),
  R.identity,
);

export const getCreateJournal = createSelector(
  getCreateJournalState,
  R.path<ICreateJournalState>(['state']),
);

export const getLoadingStatusCreateJournal = createSelector(
  getCreateJournalState,
  R.path<boolean>(['loading']),
);
// end of create journal selector
