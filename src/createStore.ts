import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
  ReducersMapObject,
  Store,
  StoreEnhancer,
} from 'redux';

import { Saga, StoreWithSaga } from 'redux-saga-connect';
import { IAction } from './types';

export interface IStore<S = {}, A = any> extends Store, StoreWithSaga {
  history?: any; // History;
}
export interface ICreateStoreParams<S = {}> {
  reducer: ReducersMapObject<S>;
  middlewares?: Middleware[];
  saga?: Saga;
  preloadedState?: S;
  ignoreSaga?: boolean;
  ignoreRouting?: boolean;
  ignoreLogger?: boolean;
}

export default function creatorStore<
  S = {},
  A extends IAction = IAction,
  Ext = {},
  StateEx = {}
>(params: ICreateStoreParams<S>): IStore<S, A> {
  const {
    reducer,
    middlewares = [],
    saga = null,
    preloadedState = {},
    ignoreLogger = false,
    ignoreRouting = false,
    ignoreSaga = false,
  } = params;

  let composeEnhancers = compose;

  const middlewareList: Middleware[] = [...middlewares];

  let history = null;
  let sagaMiddleware = null;
  /*eslint-disable */
  if (!ignoreRouting) {
    // include routing
    const HistoryPackage = require('history');
    if (HistoryPackage){
      const createBrowserHistory = HistoryPackage.createBrowserHistory;
      history = createBrowserHistory();
      const reactRouterRedux = require('react-router-redux');
      if (reactRouterRedux){
        const {routerMiddleware} = reactRouterRedux;
        middlewareList.push(routerMiddleware(history))
      }
    }

  }
  if (process.env.NODE_ENV !== 'production') {
    if (!ignoreLogger) {
      // include logger
      const createLoggerPackage = require('redux-logger');
      const reduxDevTools = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
      composeEnhancers = window[reduxDevTools] || compose;
      if (createLoggerPackage) {
        const { createLogger } = createLoggerPackage;
        const logger = createLogger({
          collapsed: true,
        });
        middlewareList.push(logger);
      }
    }
  }

  if (!ignoreSaga) {
    // include sagas
    const reduxSagaPackage = require('redux-saga');
    if (reduxSagaPackage) {
      sagaMiddleware = reduxSagaPackage.default();
      middlewareList.push(sagaMiddleware);
    }
  }
  /* eslint-enable */

  // create store
  const enhancer: StoreEnhancer<Ext, StateEx> = composeEnhancers<any>(
    applyMiddleware(...middlewareList),
  );
  const store: any = createStore<S, A, Ext, StateEx>(
    combineReducers(reducer),
    preloadedState || {},
    enhancer,
  );

  // save runSaga for redux-saga-connect
  if (!ignoreSaga && sagaMiddleware) {
    if (saga) {
      sagaMiddleware.run(saga);
    }
    store.runSaga = sagaMiddleware.run;
  }
  // save store to window
  if (window && process.env.NODE_ENV !== 'production') {
    const storeKey = 'store';
    window[storeKey] = store;
  }
  // save history to store (for connect routing)
  store.history = history;

  return store;
}
