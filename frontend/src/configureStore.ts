import { createStore, Store, applyMiddleware } from 'redux';
import { History } from 'history';

import { setAutoFreeze } from 'immer';

// additional enhancers
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore, Persistor } from 'redux-persist';

// additional middleware
import { routerMiddleware } from 'connected-react-router';

import {
  ApplicationState,
  createRootReducer,
  createRootSaga,
} from '@/reducers';

setAutoFreeze(false);

export interface ConfigureStore {
  store: Store<ApplicationState>;
  persistor: Persistor;
}

export function configureStore(
  history: History,
  initialState: ApplicationState | undefined = undefined,
): ConfigureStore {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({
    trace: true,
  });
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware, // saga middleware,
    routerMiddleware(history), // connected-react-router middleware
  ];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(createRootSaga());

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('@/reducers', () =>
      store.replaceReducer(createRootReducer(history)),
    );
  }

  return { store, persistor };
}
