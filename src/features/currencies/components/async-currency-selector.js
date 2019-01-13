import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';

const CurrencySelector = React.lazy(() => import('./currency-selector'));

const AsyncCurrencySelector = props => (
  <React.Suspense fallback={<LoadingIndicator size="small" type="cylon" />}>
    <CurrencySelector {...props} />
  </React.Suspense>
);

export default AsyncCurrencySelector;
