import { createStore, Store, applyMiddleware } from 'redux';
import { History } from 'history';

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

export interface ConfigureStore {
  store: Store<ApplicationState>;
  persistor: Persistor;
}

export function configureStore(
  history: History,
  initialState: ApplicationState,
): ConfigureStore {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({
    trace: true,
  });

  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    sagaMiddleware, // saga middleware,
    routerMiddleware(history), // connected-react-router middleware
  ];

  // We'll create our store with the combined reducers/sagas,
  // and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(createRootSaga());

  const persistor = persistStore(store);

  return { store, persistor };
}
