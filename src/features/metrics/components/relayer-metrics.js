import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import LoadingIndicator from '../../../components/loading-indicator';
import RelayerMetricsChart from './relayer-metrics-chart';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useRelayerMetrics from '../hooks/use-relayer-metrics';

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

const RelayerMetrics = ({ period, relayerId, type }) => {
  const granularity = determineGranularity(period);
  const [metrics, loading] = useRelayerMetrics(relayerId, {
    granularity,
    period,
  });
  const conversionRate = useConversionRate();

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map((metric) => ({
    ...metric,
    date: new Date(metric.date),
    tradeVolume: (parseFloat(metric.tradeVolume) || 0) * conversionRate,
  }));

  return (
    <RelayerMetricsChart
      data={data}
      granularity={granularity}
      period={period}
      type={type}
    />
  );
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
