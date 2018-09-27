import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import ScrollToTop from './scroll-to-top';

const Router = ({ children }) => (
  <BrowserRouter>
    <ScrollToTop>{children}</ScrollToTop>
  </BrowserRouter>
);

Router.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Router;
