import React from 'react';

import LoadingIndicator from './loading-indicator';
import PageLayout from './page-layout';

const LoadingPage = () => (
  <PageLayout centered>
    <LoadingIndicator />
  </PageLayout>
);

export default LoadingPage;
