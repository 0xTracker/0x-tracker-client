import PropTypes from 'prop-types';
import React from 'react';

import { METRIC_GRANULARITY, TIME_PERIOD } from '../../../constants';
import AsyncMiniRelayerMetricsChart from './async-mini-relayer-metrics-chart';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useRelayerMetrics from '../hooks/use-relayer-metrics';

const GRANULARITY_LOOKUP = {
  [TIME_PERIOD.DAY]: METRIC_GRANULARITY.HOUR,
  [TIME_PERIOD.WEEK]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.MONTH]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.YEAR]: METRIC_GRANULARITY.MONTH,
  [TIME_PERIOD.ALL]: METRIC_GRANULARITY.MONTH,
};

const MiniRelayerMetrics = ({ height, period, relayerId, type, width }) => {
  const [metrics, loading] = useRelayerMetrics(relayerId, {
    granularity: GRANULARITY_LOOKUP[period],
    period,
  });
  const conversionRate = useConversionRate();

  const data = (metrics || []).map((metric) => ({
    date: new Date(metric.date),
    tradeCount: metric.tradeCount,
    tradeVolume: (parseFloat(metric.tradeVolume) || 0) * conversionRate,
  }));

  if (loading || conversionRate === undefined) {
    return null;
  }

  return (
    <AsyncMiniRelayerMetricsChart
      data={data}
      fallback={null}
      height={height}
      type={type}
      width={width}
    />
  );
};

MiniRelayerMetrics.propTypes = {
  height: PropTypes.number.isRequired,
  period: PropTypes.string,
  relayerId: PropTypes.string.isRequired,
  type: PropTypes.string,
  width: PropTypes.number.isRequired,
};

MiniRelayerMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume',
};

export default MiniRelayerMetrics;
