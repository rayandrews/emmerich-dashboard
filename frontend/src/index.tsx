import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import { App } from '@/App';
import * as serviceWorker from '@/serviceWorker';
import { configureStore } from '@/configureStore';
import { initializeRequest } from '@/utils/request';
import '@/utils/i18n';

// configuring store
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

const history = createBrowserHistory({
  basename: getBasename(),
});

// const initialState = loadState<ApplicationState>();

const { store, persistor } = configureStore(history);
initializeRequest(store);

const render = (Component: any) => {
  return ReactDOM.render(Component, document.getElementById('root'));
};

render(<App store={store} history={history} persistor={persistor} />);

if (module.hot) {
  module.hot.accept('@/App', () => {
    const { App: NextApp } = require('@/App');
    render(<NextApp store={store} history={history} persistor={persistor} />);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
