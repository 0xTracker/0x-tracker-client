import { init } from '@rematch/core';
import { responsiveStoreEnhancer } from 'redux-responsive';
import createRematchPersist, { getPersistor } from '@rematch/persist';
import storage from 'redux-persist/es/storage';

import debounceMiddleware from './debounce-middleware';
import models from './models';
import reducers from './reducers';

const storeFactory = () => {
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
      middlewares: [debounceMiddleware()],
      reducers,
    },
  });
  const persistor = getPersistor();

  return { persistor, store };
};

export default storeFactory;
