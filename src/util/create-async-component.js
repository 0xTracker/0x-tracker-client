import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../components/loading-indicator';

const createAsyncComponent = importer => {
  const AsyncComponent = React.lazy(importer);
  const ComponentLoader = ({ fallback, ...props }) => (
    <React.Suspense fallback={fallback || <LoadingIndicator centered />}>
      <AsyncComponent {...props} />
    </React.Suspense>
  );

  ComponentLoader.propTypes = {
    fallback: PropTypes.node,
  };

  ComponentLoader.defaultProps = {
    fallback: undefined,
  };

  return ComponentLoader;
};

export default createAsyncComponent;
