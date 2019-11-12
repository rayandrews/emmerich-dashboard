import { createSelector } from 'reselect';
import * as R from 'ramda';

import { BaseState, State } from './types';

export const getAuth = createSelector(
  R.path<State['state']>(['state']),
  R.identity,
);

export const getAccessToken = createSelector(
  R.path<BaseState['accessToken']>(['accessToken']),
  R.identity,
);

export const getUser = createSelector(
  R.path<BaseState['user']>(['user']),
  R.identity,
);

export const isLoggedIn = createSelector(
  getAccessToken,
  R.compose(R.not, R.either(R.isNil, R.isEmpty)),
);

export const getAccessTokenFromAuth = createSelector(getAuth, getAccessToken);

export const isLoggedInFromAuth = createSelector(getAuth, isLoggedIn);

export const getUserFromAuth = createSelector(getAuth, getUser);
