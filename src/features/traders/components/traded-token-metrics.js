import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import LoadingIndicator from '../../../components/loading-indicator';
import TradedTokenMetricsChart from './traded-token-metrics-chart';
import useTradedTokenMetrics from '../hooks/use-traded-token-metrics';

const determineGranularity = (period) => {
  if (period === TIME_PERIOD.ALL) {
    return 'month';
  }

  if (period === TIME_PERIOD.YEAR) {
    return 'week';
  }

  if (period === TIME_PERIOD.MONTH) {
    return 'day';
  }

  return 'hour';
};

const TradedTokenMetrics = ({ period }) => {
  const granularity = determineGranularity(period);
  const [metrics, loading] = useTradedTokenMetrics({ granularity, period });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map((metric) => ({
    date: new Date(metric.date),
    tradedTokens: metric.tradedTokens,
  }));

  return (
    <TradedTokenMetricsChart
      data={data}
      granularity={granularity}
      period={period}
    />
  );
};

TradedTokenMetrics.propTypes = {
  period: PropTypes.string,
};

TradedTokenMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
};

export default TradedTokenMetrics;
