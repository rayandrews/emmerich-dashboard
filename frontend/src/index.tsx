import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import { App } from '@/App';
import * as serviceWorker from '@/serviceWorker';
import { configureStore } from '@/configureStore';
import { ApplicationState } from '@/reducers';
import { initializeRequest } from '@/utils/request';
import { loadState, saveState } from '@/utils/persist';
import '@/utils/i18n';

// configuring store
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

const history = createBrowserHistory({
  basename: getBasename(),
});

const initialState = loadState<ApplicationState>();

const { store, persistor } = configureStore(history, initialState);
initializeRequest(store);

ReactDOM.render(
  <App store={store} history={history} persistor={persistor} />,
  document.getElementById('root'),
);

store.subscribe(() => console.log(store.getState()));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
