import loadable from 'loadable-components';
import React from 'react';

import LoadingIndicator from '../components/loading-indicator';

const createAsyncComponent = importer =>
  loadable(importer, {
    // eslint-disable-next-line react/display-name
    render: ({ Component, loading, ownProps }) => {
      if (loading) return <LoadingIndicator centered />;
      return <Component {...ownProps} />;
    },
  });

export default createAsyncComponent;
