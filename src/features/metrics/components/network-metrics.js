import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import NetworkMetricsChart from './network-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useNetworkMetrics from '../hooks/use-network-metrics';

const determineGranularity = (period) => {
  if (_.isPlainObject(period)) {
    return undefined; // Defer to API
  }

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

const NetworkMetrics = ({ filters, period, type }) => {
  const granularity = determineGranularity(period);
  const [metrics, loading] = useNetworkMetrics(
    { filters, granularity, period },
    { autoReload: true },
  );
  const conversionRate = useConversionRate();
  const displayCurrency = useDisplayCurrency();

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map((metric) => ({
    date: new Date(metric.date),
    protocolFees: (parseFloat(metric.protocolFees.USD) || 0) * conversionRate,
    protocolFeesETH: metric.protocolFees.ETH,
    tradeCount: metric.tradeCount,
    tradeVolume: (parseFloat(metric.tradeVolume) || 0) * conversionRate,
  }));

  return (
    <NetworkMetricsChart
      currency={displayCurrency}
      data={data}
      period={period}
      type={type}
    />
  );
};

NetworkMetrics.propTypes = {
  filters: PropTypes.object,
  period: PropTypes.string,
  type: PropTypes.string,
};

NetworkMetrics.defaultProps = {
  filters: undefined,
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume',
};

export default NetworkMetrics;
