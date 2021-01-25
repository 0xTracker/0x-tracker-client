import PropTypes from 'prop-types';
import React from 'react';

import { METRIC_GRANULARITY, TIME_PERIOD } from '../../../constants';
import MiniTraderMetricsChart from './mini-trader-metrics-chart';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useTraderMetrics from '../hooks/use-trader-metrics';

const GRANULARITY_LOOKUP = {
  [TIME_PERIOD.DAY]: METRIC_GRANULARITY.HOUR,
  [TIME_PERIOD.WEEK]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.MONTH]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.YEAR]: METRIC_GRANULARITY.MONTH,
  [TIME_PERIOD.ALL]: METRIC_GRANULARITY.MONTH,
};

const MiniTraderMetrics = ({ address, height, period, type, width }) => {
  const [metrics, loading] = useTraderMetrics(address, {
    granularity: GRANULARITY_LOOKUP[period],
    period,
  });

  const conversionRate = useConversionRate();

  const data = (metrics || []).map((metric) => ({
    date: new Date(metric.date),
    tradeCount: metric.tradeCount,
    tradeVolume: {
      maker: metric.tradeVolume.maker * conversionRate,
      taker: metric.tradeVolume.taker * conversionRate,
      total: metric.tradeVolume.total * conversionRate,
    },
  }));

  if (loading || conversionRate === undefined) {
    return null;
  }

  return (
    <MiniTraderMetricsChart
      data={data}
      fallback={null}
      height={height}
      type={type}
      width={width}
    />
  );
};

MiniTraderMetrics.propTypes = {
  address: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  period: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default MiniTraderMetrics;
