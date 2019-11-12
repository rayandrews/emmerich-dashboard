import React from 'react';

import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { History } from 'history';

import { ApplicationState } from '@/reducers';
import { NotificationSystem } from '@/components/NotificationSystem';
import { PageSpinner } from '@/components/PageSpinner';
import { Routes } from '@/Routes';

import '@/styles/reduction.scss';

export interface AppProps {
  store: Store<ApplicationState>;
  history: History;
  persistor: Persistor;
}

export const App: React.FunctionComponent<AppProps> = ({
  persistor,
  store,
  history,
}) => {
  // store.dispatch(fetchCsrfAction.request()); // get csrf token

  return (
    <Provider store={store}>
      <PersistGate loading={<PageSpinner />} persistor={persistor}>
        <ConnectedRouter history={history}>
          <NotificationSystem />
          <Routes />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};
