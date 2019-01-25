import { Route } from 'react-router';
import React from 'react';

import ErrorBoundary from '../components/error-boundary';

const createPageRoute = (path, Component) => (
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

export default createPageRoute;
