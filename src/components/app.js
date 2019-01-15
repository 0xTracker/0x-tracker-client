import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import AppLayout from './app-layout';
import GlobalStyles from './global-styles';
import Router from './router';
import Routes from './routes';

const App = () => (
  <Router>
    <GlobalStyles />
    <Helmet defaultTitle="0x Tracker" titleTemplate="%s | 0x Tracker" />
    <AppLayout>
      <Routes />
    </AppLayout>
  </Router>
);

export default hot(module)(App);
