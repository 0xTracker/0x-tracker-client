import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import AppMetricsChart from './app-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useAppMetrics from '../hooks/use-app-metrics';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';

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

const AppMetrics = ({ appId, period, type }) => {
  const granularity = determineGranularity(period);
  const conversionRate = useConversionRate();

  const [metrics, loading] = useAppMetrics(appId, {
    granularity,
    period,
  });

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map((metric) => ({
    ...metric,
    activeTraders: metric.activeTraders,
    date: new Date(metric.date),
    tradeCount: metric.tradeCount.total,
    tradeVolume: metric.tradeVolume.total * conversionRate,
  }));

  return (
    <AppMetricsChart
      data={data}
      granularity={granularity}
      period={period}
      type={type}
    />
  );
};

AppMetrics.propTypes = {
  appId: PropTypes.string.isRequired,
  period: PropTypes.string,
  type: PropTypes.string,
};

AppMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume',
};

export default AppMetrics;
