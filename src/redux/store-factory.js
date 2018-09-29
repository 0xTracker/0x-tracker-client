import { init } from '@rematch/core';
import { responsiveStoreEnhancer } from 'redux-responsive';
import createRematchPersist, { getPersistor } from '@rematch/persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/es/storage';

import debounceMiddleware from './debounce-middleware';
import models from './models';
import reducers from './reducers';
import rootSaga from './root-saga';

const storeFactory = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = init({
    models,
    plugins: [
      createRematchPersist({
        key: 'root',
        storage,
        whitelist: ['preferences'],
      }),
    ],
    redux: {
      enhancers: [responsiveStoreEnhancer],
      middlewares: [sagaMiddleware, debounceMiddleware()],
      reducers,
    },
  });
  const persistor = getPersistor();

  sagaMiddleware.run(rootSaga);

  return { persistor, store };
};

export default storeFactory;
