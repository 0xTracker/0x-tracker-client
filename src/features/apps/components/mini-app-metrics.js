import PropTypes from 'prop-types';
import React from 'react';

import { METRIC_GRANULARITY, TIME_PERIOD } from '../../../constants';
import MiniAppMetricsChart from './mini-app-metrics-chart';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useAppMetrics from '../hooks/use-app-metrics';

const GRANULARITY_LOOKUP = {
  [TIME_PERIOD.DAY]: METRIC_GRANULARITY.HOUR,
  [TIME_PERIOD.WEEK]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.MONTH]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.YEAR]: METRIC_GRANULARITY.MONTH,
  [TIME_PERIOD.ALL]: METRIC_GRANULARITY.MONTH,
};

const MiniAppMetrics = ({ appId, height, period, type, width }) => {
  const [metrics, loading] = useAppMetrics(appId, {
    granularity: GRANULARITY_LOOKUP[period],
    period,
  });

  const conversionRate = useConversionRate();

  const data = (metrics || []).map((metric) => ({
    date: new Date(metric.date),
    tradeCount: metric.tradeCount.total,
    tradeVolume: (parseFloat(metric.tradeVolume.total) || 0) * conversionRate,
  }));

  if (loading || conversionRate === undefined) {
    return null;
  }

  return (
    <MiniAppMetricsChart
      data={data}
      fallback={null}
      height={height}
      type={type}
      width={width}
    />
  );
};

MiniAppMetrics.propTypes = {
  appId: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  period: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.number.isRequired,
};

MiniAppMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume',
};

export default MiniAppMetrics;
