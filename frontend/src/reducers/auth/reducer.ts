import { combineReducers, Reducer } from 'redux';
import { createReducer, ActionType } from 'typesafe-actions';

import produce, { Draft } from 'immer';

// user signup
import { createUserWithLoginAction } from '@/reducers/user';

import { isLoading, isError } from '@/utils/reducers';

import { State, BaseState } from './types';
import * as actions from './actions';

export type Action =
  | ActionType<typeof actions>
  | ActionType<typeof createUserWithLoginAction>; // added for registering user with auto login

export const initialState: BaseState = {
  expiresIn: null,
  accessToken: null,
  user: null,
};

export const isLoadingAuth = isLoading(
  actions.loginAction,
  createUserWithLoginAction,
);

export const isErrorAuth = isError(actions.loginAction.failure);

export const auth = createReducer<BaseState, Action>(initialState)
  .handleAction(
    actions.loginAction.success,
    // produce(
    (
      state: BaseState,
      action: ActionType<typeof actions.loginAction.success>,
    ) => {
      // state.accessToken = action.payload.accessToken;
      // state.expiresIn = action.payload.expiresIn;

      return {
        ...state,
        accessToken: action.payload.accessToken,
        expiresIn: action.payload.expiresIn,
      };
    },
    // ),
  )

  .handleAction(
    actions.checkProfileAction.success,
    produce(
      (
        state: Draft<BaseState>,
        action: ActionType<typeof actions.checkProfileAction.success>,
      ) => {
        state.user = action.payload;
      },
    ),
  )
  .handleAction(
    createUserWithLoginAction.success,
    produce(
      (
        state: Draft<BaseState>,
        action: ActionType<typeof createUserWithLoginAction.success>,
      ) => {
        state.accessToken = action.payload.token.accessToken;
        state.accessToken = action.payload.token.expiresIn;
      },
    ),
  );

export const reducer: Reducer<State, Action> = combineReducers({
  loading: isLoadingAuth,
  state: auth,
  error: isErrorAuth,
});
