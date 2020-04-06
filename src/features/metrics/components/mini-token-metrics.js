import PropTypes from 'prop-types';
import React from 'react';

import { METRIC_GRANULARITY, TIME_PERIOD } from '../../../constants';
import AsyncMiniTokenMetricsChart from './async-mini-token-metrics-chart';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useTokenMetrics from '../hooks/use-token-metrics';

const GRANULARITY_LOOKUP = {
  [TIME_PERIOD.DAY]: METRIC_GRANULARITY.HOUR,
  [TIME_PERIOD.WEEK]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.MONTH]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.YEAR]: METRIC_GRANULARITY.MONTH,
  [TIME_PERIOD.ALL]: METRIC_GRANULARITY.MONTH,
};

const MiniTokenMetrics = ({ height, period, tokenAddress, type, width }) => {
  const [metrics, loading] = useTokenMetrics(tokenAddress, {
    granularity: GRANULARITY_LOOKUP[period],
    period,
  });
  const conversionRate = useConversionRate();

  const data = (metrics || []).map((metric) => ({
    date: new Date(metric.date),
    tradeCount: metric.tradeCount,
    tradeVolume: {
      USD: parseFloat(metric.tradeVolume.USD) * conversionRate,
      token: metric.tradeVolume.token,
    },
  }));

  if (loading || conversionRate === undefined) {
    return null;
  }

  return (
    <AsyncMiniTokenMetricsChart
      data={data}
      fallback={null}
      height={height}
      type={type}
      width={width}
    />
  );
};

MiniTokenMetrics.propTypes = {
  height: PropTypes.number.isRequired,
  period: PropTypes.string,
  tokenAddress: PropTypes.string.isRequired,
  type: PropTypes.string,
  width: PropTypes.number.isRequired,
};

MiniTokenMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume.USD',
};

export default MiniTokenMetrics;
