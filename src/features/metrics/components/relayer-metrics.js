import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import AsyncRelayerMetricsChart from './async-relayer-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useRelayerMetrics from '../hooks/use-relayer-metrics';

const RelayerMetrics = ({ period, relayerId, type }) => {
  const [metrics, loading] = useRelayerMetrics(relayerId, { period });
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

  return <AsyncRelayerMetricsChart data={data} period={period} type={type} />;
};

RelayerMetrics.propTypes = {
  period: PropTypes.string,
  relayerId: PropTypes.string.isRequired,
  type: PropTypes.string,
};

RelayerMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume',
};

export default RelayerMetrics;
