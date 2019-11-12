import { createSelector } from 'reselect';
import * as R from 'ramda';

import { State, ICreateUserState } from './types';

export const getCreateUserState = createSelector(
  R.path<State['create']>(['create']),
  R.identity,
);

export const isCreateUserLoading = createSelector(
  getCreateUserState,
  R.path<State['create']['loading']>(['loading']),
);

export const getCreateUserResponse = createSelector(
  getCreateUserState,
  R.path<ICreateUserState>(['state']),
);
