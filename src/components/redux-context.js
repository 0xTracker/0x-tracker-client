import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import createStore from '../redux/store-factory';

const { store, persistor } = createStore();

const ReduxContext = ({ children }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>{children}</PersistGate>
  </Provider>
);

ReduxContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReduxContext;
