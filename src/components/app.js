import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { BreakpointProvider } from '../responsive-utils';
import { BREAKPOINTS } from '../constants';
import AppLayout from './app-layout';
import ErrorBoundary from './error-boundary';
import GlobalStyles from './global-styles';
import PreferencesProvider from '../features/preferences/components/preferences-provider';
import RatesProvider from '../features/currencies/components/rates-provider';
import Router from './router';
import Routes from './routes';

const App = () => (
  <ErrorBoundary>
    <BreakpointProvider breakpoints={BREAKPOINTS}>
      <PreferencesProvider>
        <RatesProvider>
          <Router>
            <GlobalStyles />
            <Helmet defaultTitle="0x Tracker" titleTemplate="%s | 0x Tracker" />
            <AppLayout>
              <Routes />
            </AppLayout>
          </Router>
        </RatesProvider>
      </PreferencesProvider>
    </BreakpointProvider>
  </ErrorBoundary>
);

export default hot(module)(App);
