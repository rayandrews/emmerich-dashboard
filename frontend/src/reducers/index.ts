import { combineReducers, Reducer } from 'redux';
import { fork } from 'redux-saga/effects';

import { persistReducer, PersistState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { History } from 'history';

// additional reducers from libraries
import { connectRouter, RouterState } from 'connected-react-router';

// own implementation of reducers
import * as app from './app';
import * as auth from './auth';
import * as user from './user';
import * as accounting from './accounting';

const persistConfig = {
  key: 'root',
  storage,
};

export type Action = app.Action | auth.Action | user.Action | accounting.Action;

// The top-level state object
export interface ApplicationState {
  app: app.State;
  auth: auth.State;
  user: user.State;
  accounting: accounting.State;
  router: RouterState;
  _persist: PersistState;
}

type _ApplicationState = ApplicationState | undefined;

export function createRootSaga() {
  return function*() {
    yield fork(app.saga);
    yield fork(auth.saga);
    yield fork(user.saga);
    yield fork(accounting.saga);
  };
}

export function createRootReducer(
  history: History,
): Reducer<ApplicationState, Action> {
  const baseRootReducer = combineReducers({
    app: app.reducer,
    auth: auth.reducer,
    user: user.reducer,
    accounting: accounting.reducer,
    router: connectRouter(history),
  });

  const rootReducer = persistReducer(persistConfig, baseRootReducer);

  return (state: _ApplicationState, action: Action) => {
    if (action.type === auth.USER_LOGOUT) {
      state = undefined;
      storage.removeItem('persist:root');
    }

    return rootReducer(state, action);
  };
}
