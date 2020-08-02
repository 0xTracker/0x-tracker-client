import PropTypes from 'prop-types';
import React from 'react';

import { METRIC_GRANULARITY, TIME_PERIOD } from '../../../constants';
import MiniAppMetricsChart from './mini-app-metrics-chart';
import useAppMetrics from '../hooks/use-app-metrics';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';

const GRANULARITY_LOOKUP = {
  [TIME_PERIOD.DAY]: METRIC_GRANULARITY.HOUR,
  [TIME_PERIOD.WEEK]: METRIC_GRANULARITY.HOUR,
  [TIME_PERIOD.MONTH]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.YEAR]: METRIC_GRANULARITY.MONTH,
  [TIME_PERIOD.ALL]: METRIC_GRANULARITY.MONTH,
};

const MiniAppMetrics = ({ app, height, period, type, width }) => {
  const [metrics, loading] = useAppMetrics(app, {
    granularity: GRANULARITY_LOOKUP[period],
    period,
  });

  const conversionRate = useConversionRate();

  const data = (metrics || []).map((metric) => ({
    date: new Date(metric.date),
    totalTrades: metric.totalTrades,
    totalVolume: (parseFloat(metric.totalVolume) || 0) * conversionRate,
  }));

  if (loading || conversionRate === undefined) {
    return null;
  }

  if (width === 0 || height === 0) {
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
  app: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  period: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.number.isRequired,
};

MiniAppMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: undefined,
};

export default MiniAppMetrics;
