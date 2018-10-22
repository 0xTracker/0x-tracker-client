import { hot } from 'react-hot-loader';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import AppLayout from './app-layout';
import GlobalStyles from './global-styles';
import Router from './router';
import Routes from './routes';

const App = () => (
  <Router>
    <GlobalStyles />
    <AppLayout>
      <Routes />
    </AppLayout>
  </Router>
);

export default hot(module)(App);
