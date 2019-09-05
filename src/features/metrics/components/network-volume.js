import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import AsyncNetworkVolumeChart from './async-network-volume-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useNetworkMetrics from '../hooks/use-network-metrics';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';

const NetworkVolume = ({ period, relayerId, type }) => {
  const [metrics, loading] = useNetworkMetrics({ period, relayerId });
  const displayCurrency = useDisplayCurrency();
  const conversionRate = useConversionRate();

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map(metric => ({
    date: new Date(metric.date),
    fills: metric.fills,
    volume: (parseFloat(metric.volume) || 0) * conversionRate,
  }));

  return (
    <AsyncNetworkVolumeChart
      data={data}
      displayCurrency={displayCurrency}
      period={period}
      type={type}
    />
  );
};

NetworkVolume.propTypes = {
  period: PropTypes.string,
  relayerId: PropTypes.string,
  type: PropTypes.string,
};

NetworkVolume.defaultProps = {
  period: TIME_PERIOD.MONTH,
  relayerId: undefined,
  type: 'volume',
};

export default NetworkVolume;
