import { Route } from 'react-router';
import React from 'react';

import createAsyncComponent from './create-async-component';
import ErrorBoundary from '../components/error-boundary';
import PageLoadingIndicator from '../components/page-loading-indicator';

const createPageRoute = (path, loader, key = path) => {
  const Component = createAsyncComponent(loader);

  return (
    <Route
      exact
      key={key}
      path={path}
      render={props => (
        <ErrorBoundary>
          <Component {...props} fallback={<PageLoadingIndicator />} />
        </ErrorBoundary>
      )}
    />
  );
};

export default createPageRoute;
