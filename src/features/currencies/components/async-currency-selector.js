import React from 'react';

const CurrencySelector = React.lazy(() => import('./currency-selector'));

const AsyncCurrencySelector = props => (
  <React.Suspense fallback={<span />}>
    <CurrencySelector {...props} />
  </React.Suspense>
);

export default AsyncCurrencySelector;
