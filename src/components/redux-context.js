import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import createStore from '../redux/store-factory';

const store = createStore();

const ReduxContext = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

ReduxContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReduxContext;
