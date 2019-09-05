import { init } from '@rematch/core';
import { responsiveStoreEnhancer } from 'redux-responsive';

import reducers from './reducers';

const storeFactory = () => {
  const store = init({
    redux: {
      enhancers: [responsiveStoreEnhancer],
      reducers,
    },
  });

  return store;
};

export default storeFactory;
