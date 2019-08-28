import React from 'react';

import LoadingIndicator from './loading-indicator';

const TimePeriodSelector = React.lazy(() => import('./time-period-selector'));

const AsyncTimePeriodSelector = props => (
  <React.Suspense fallback={<LoadingIndicator size="small" type="cylon" />}>
    <TimePeriodSelector {...props} />
  </React.Suspense>
);

export default AsyncTimePeriodSelector;
