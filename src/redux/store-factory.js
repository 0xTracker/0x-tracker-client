import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { responsiveStoreEnhancer } from 'redux-responsive';
import storage from 'redux-persist/es/storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducer';
import rootSaga from './root-saga';

const config = {
  key: 'root',
  storage,
  whitelist: ['preferences'],
};
const reducer = persistReducer(config, rootReducer);

const storeFactory = () => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeEnhancers(
    responsiveStoreEnhancer,
    applyMiddleware(sagaMiddleware),
  );
  const store = createStore(reducer, enhancer);
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { persistor, store };
};

export default storeFactory;
