import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import TopTokens from '../../tokens/components/top-tokens';
import ErrorBoundary from '../../../components/error-boundary';

const HomePageTopTokens = () => (
  <ErrorBoundary>
    <TopTokens period={TIME_PERIOD.DAY} />
  </ErrorBoundary>
);

export default HomePageTopTokens;
