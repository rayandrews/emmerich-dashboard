import { combineReducers, Reducer } from 'redux';
import { createReducer, ActionType } from 'typesafe-actions';

import * as R from 'ramda';
import produce, { Draft } from 'immer';

import { isLoading, isError } from '@/utils/reducers';

import { State, ICreateUserState } from './types';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export const createUserInitialState: ICreateUserState = {
  name: null,
  email: null,
  id: null,
  username: null,
  lastLogin: null,
  createdAt: null,
  updatedAt: null,
};

export const isLoadingCreateUser = isLoading(
  actions.createUserAction,
  actions.createUserWithLoginAction,
);

export const isErrorCreateUser = isError(
  actions.createUserAction.failure,
  actions.createUserWithLoginAction.failure,
);

export const createUserReducer = createReducer<ICreateUserState, Action>(
  createUserInitialState,
)
  .handleAction(
    actions.createUserWithLoginAction.success,
    produce(
      (
        state: Draft<ICreateUserState>,
        action: ActionType<typeof actions.createUserWithLoginAction.success>,
      ) => {
        return R.omit(['token'], action.payload);
      },
    ),
  )
  .handleAction(
    actions.createUserAction.success,
    produce(
      (
        state: Draft<ICreateUserState>,
        action: ActionType<typeof actions.createUserAction.success>,
      ) => {
        return action.payload;
      },
    ),
  );

export const reducer: Reducer<State, Action> = combineReducers({
  create: combineReducers({
    loading: isLoadingCreateUser,
    state: createUserReducer,
    error: isErrorCreateUser,
  }),
});
