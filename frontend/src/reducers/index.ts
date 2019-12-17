import { combineReducers, Reducer } from 'redux';
import { fork } from 'redux-saga/effects';

import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { History } from 'history';

// additional reducers from libraries
import { connectRouter, RouterState } from 'connected-react-router';

// own implementation of reducers
import * as app from './app';
import * as auth from './auth';
import * as user from './user';
import * as accounting from './accounting';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export type Action = app.Action | auth.Action | user.Action | accounting.Action;

// The top-level state object
export type ApplicationState = {
  app: app.State;
  auth: auth.State & PersistPartial;
  user: user.State;
  accounting: accounting.State;
  router: RouterState;
} & PersistPartial;

type _ApplicationState = ApplicationState | undefined;

export function createRootSaga() {
  return function*() {
    yield fork(app.saga);
    yield fork(auth.saga);
    yield fork(user.saga);
    yield fork(accounting.saga);
  };
}

const rootPersistConfig: PersistConfig<ApplicationState> = {
  key: 'root',
  keyPrefix: '',
  debug: true,
  storage,
  // stateReconciler: hardSet,
  blacklist: ['app', 'auth', 'accounting', 'user'],
};

const authPersistConfig: PersistConfig<auth.State> = {
  key: 'auth',
  keyPrefix: '',
  debug: true,
  storage,
  whitelist: ['state'],
};

export function createRootReducer(
  history: History,
): Reducer<ApplicationState, Action> {
  const baseRootReducer = combineReducers({
    app: app.reducer,
    auth: persistReducer(authPersistConfig, auth.reducer),
    user: user.reducer,
    accounting: accounting.reducer,
    router: connectRouter(history),
  });

  const rootReducer = persistReducer(
    rootPersistConfig as any,
    baseRootReducer,
  ) as Reducer<ApplicationState, Action>;

  return (state: _ApplicationState, action: Action) => {
    if (action.type === auth.USER_LOGOUT) {
      storage.removeItem('root');
      storage.removeItem('auth');
      state = undefined;
    }

    return rootReducer(state, action) as ApplicationState;
  };
}
