import { hot } from 'react-hot-loader/root';
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
  <BreakpointProvider breakpoints={BREAKPOINTS}>
    <ErrorBoundary>
      <PreferencesProvider>
        <RatesProvider>
          <Router>
            <GlobalStyles />
            <AppLayout>
              <Routes />
            </AppLayout>
          </Router>
        </RatesProvider>
      </PreferencesProvider>
    </ErrorBoundary>
  </BreakpointProvider>
);

export default hot(App);
