import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import ActiveTraderMetricsChart from './active-trader-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useActiveTraderMetrics from '../hooks/use-active-trader-metrics';

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

const ActiveTraderMetrics = ({ period, type }) => {
  const granularity = determineGranularity(period);
  const [metrics, loading] = useActiveTraderMetrics({ granularity, period });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map((metric) => ({
    date: new Date(metric.date),
    makerCount: metric.makerCount,
    takerCount: metric.takerCount,
    traderCount: metric.traderCount,
  }));

  return (
    <ActiveTraderMetricsChart
      data={data}
      granularity={granularity}
      period={period}
      type={type}
    />
  );
};

ActiveTraderMetrics.propTypes = {
  period: PropTypes.string,
  type: PropTypes.string,
};

ActiveTraderMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: 'traderCount',
};

export default ActiveTraderMetrics;
