import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import ActiveRelayerMetricsChart from './active-relayer-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useActiveRelayerMetrics from '../hooks/use-active-relayer-metrics';

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

const ActiveRelayerMetrics = ({ period }) => {
  const granularity = determineGranularity(period);
  const [metrics, loading] = useActiveRelayerMetrics({ granularity, period });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map((metric) => ({
    activeRelayers: metric.activeRelayers,
    date: new Date(metric.date),
  }));

  return (
    <ActiveRelayerMetricsChart
      data={data}
      granularity={granularity}
      period={period}
    />
  );
};

ActiveRelayerMetrics.propTypes = {
  period: PropTypes.string,
};

ActiveRelayerMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
};

export default ActiveRelayerMetrics;
