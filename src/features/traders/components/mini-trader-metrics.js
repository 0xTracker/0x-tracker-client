import PropTypes from 'prop-types';
import React from 'react';

import { METRIC_GRANULARITY, TIME_PERIOD } from '../../../constants';
import createAsyncComponent from '../../../util/create-async-component';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useTraderMetrics from '../hooks/use-trader-metrics';

const GRANULARITY_LOOKUP = {
  [TIME_PERIOD.DAY]: METRIC_GRANULARITY.HOUR,
  [TIME_PERIOD.WEEK]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.MONTH]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.YEAR]: METRIC_GRANULARITY.MONTH,
  [TIME_PERIOD.ALL]: METRIC_GRANULARITY.MONTH,
};

const AsyncMiniTraderMetricsChart = createAsyncComponent(() =>
  import('./mini-trader-metrics-chart'),
);

const MiniTraderMetrics = ({ address, height, period, type, width }) => {
  const [metrics, loading] = useTraderMetrics(address, {
    granularity: GRANULARITY_LOOKUP[period],
    period,
  });

  const conversionRate = useConversionRate();

  const data = (metrics || []).map((metric) => ({
    date: new Date(metric.date),
    fillCount: metric.fillCount,
    fillVolume: {
      maker: metric.fillVolume.maker * conversionRate,
      taker: metric.fillVolume.taker * conversionRate,
      total: metric.fillVolume.total * conversionRate,
    },
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
    <AsyncMiniTraderMetricsChart
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
