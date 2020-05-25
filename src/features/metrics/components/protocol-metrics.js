import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import ProtocolMetricsChart from './protocol-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useProtocolMetrics from '../hooks/use-protocol-metrics';

const determineGranularity = (period) => {
  if (period === TIME_PERIOD.WEEK || period === TIME_PERIOD.MONTH) {
    return 'day';
  }

  if (period === TIME_PERIOD.ALL) {
    return 'month';
  }

  if (period === TIME_PERIOD.YEAR) {
    return 'week';
  }

  return 'hour';
};

const ProtocolMetrics = ({ period }) => {
  const granularity = determineGranularity(period);
  const [metrics, loading] = useProtocolMetrics({ granularity, period });
  const conversionRate = useConversionRate();
  const displayCurrency = useDisplayCurrency();

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = (metrics || []).map((metric) => ({
    date: new Date(metric.date),
    stats: metric.stats.map((stat) => ({
      ...stat,
      tradeVolume: (parseFloat(stat.tradeVolume) || 0) * conversionRate,
    })),
  }));

  return (
    <ProtocolMetricsChart
      currency={displayCurrency}
      data={data}
      granularity={granularity}
      period={period}
    />
  );
};

ProtocolMetrics.propTypes = {
  period: PropTypes.string,
};

ProtocolMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
};

export default ProtocolMetrics;
