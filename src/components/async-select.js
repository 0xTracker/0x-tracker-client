import React from 'react';

import LoadingIndicator from './loading-indicator';

const Select = React.lazy(() => import('./select'));

const AsyncSelect = (props) => (
  <React.Suspense fallback={<LoadingIndicator size="small" type="cylon" />}>
    <Select {...props} />
  </React.Suspense>
);

export default AsyncSelect;
