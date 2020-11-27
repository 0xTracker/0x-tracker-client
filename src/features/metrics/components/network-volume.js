import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import NetworkVolumeChart from './network-volume-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useNetworkMetrics from '../hooks/use-network-metrics';
import sharedPropTypes from '../../../prop-types';

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

const NetworkVolume = ({ filters, granularity, period, type }) => {
  const defaultGranularity = determineGranularity(period);
  const [metrics, loading] = useNetworkMetrics(
    { filters, granularity: granularity || defaultGranularity, period },
    { autoReload: true },
  );
  const conversionRate = useConversionRate();
  const displayCurrency = useDisplayCurrency();

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map((metric) => ({
    avgTradeSize:
      ((parseFloat(metric.tradeVolume) || 0) * conversionRate) /
      metric.tradeCount,
    date: new Date(metric.date),
    tradeCount: metric.tradeCount,
    tradeVolume: (parseFloat(metric.tradeVolume) || 0) * conversionRate,
  }));

  return (
    <NetworkVolumeChart
      currency={displayCurrency}
      data={data}
      period={period}
      type={type}
    />
  );
};

NetworkVolume.propTypes = {
  filters: PropTypes.object,
  granularity: sharedPropTypes.granularity,
  period: sharedPropTypes.timePeriod,
  type: PropTypes.string,
};

NetworkVolume.defaultProps = {
  filters: undefined,
  granularity: undefined,
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume',
};

export default NetworkVolume;
