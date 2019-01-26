import { Route } from 'react-router';
import React from 'react';

import createAsyncComponent from './create-async-component';
import ErrorBoundary from '../components/error-boundary';

const createPageRoute = (path, loader) => {
  const Component = createAsyncComponent(loader); // TODO: Override fallback with a page loading indicator

  return (
    <Route
      exact
      key={path}
      path={path}
      render={props => (
        <ErrorBoundary>
          <Component {...props} />
        </ErrorBoundary>
      )}
    />
  );
};

export default createPageRoute;
