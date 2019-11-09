import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import AsyncNetworkMetricsChart from './async-network-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useNetworkMetrics from '../hooks/use-network-metrics';

const NetworkMetrics = ({ period, type }) => {
  const [metrics, loading] = useNetworkMetrics({ period });
  const conversionRate = useConversionRate();

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map(metric => ({
    date: new Date(metric.date),
    fillCount: metric.fillCount,
    fillVolume: (parseFloat(metric.fillVolume) || 0) * conversionRate,
    tradeCount: metric.tradeCount,
    tradeVolume: (parseFloat(metric.tradeVolume) || 0) * conversionRate,
  }));

  return <AsyncNetworkMetricsChart data={data} period={period} type={type} />;
};

NetworkMetrics.propTypes = {
  period: PropTypes.string,
  type: PropTypes.string,
};

NetworkMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume',
};

export default NetworkMetrics;
