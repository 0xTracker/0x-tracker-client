import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const Router = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

Router.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Router;
