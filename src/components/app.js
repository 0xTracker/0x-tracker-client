import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import AppLayout from './app-layout';
import ErrorBoundary from './error-boundary';
import GlobalStyles from './global-styles';
import Router from './router';
import Routes from './routes';

const App = () => (
  <ErrorBoundary>
    <Router>
      <GlobalStyles />
      <Helmet defaultTitle="0x Tracker" titleTemplate="%s | 0x Tracker" />
      <AppLayout>
        <Routes />
      </AppLayout>
    </Router>
  </ErrorBoundary>
);

export default hot(module)(App);
