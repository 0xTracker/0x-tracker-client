import React from 'react';
import PropTypes from 'prop-types';

import AsyncTokenVolumeChart from './async-token-volume-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import useTokenVolumeMetrics from '../hooks/use-token-volume-metrics';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';

const TokenVolume = ({ period, token }) => {
  const metrics = useTokenVolumeMetrics(token.address, { period });
  const displayCurrency = useDisplayCurrency();
  const conversionRate = useConversionRate();

  if (metrics.loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.data.map(metric => ({
    date: new Date(metric.date),
    localizedVolume: metric.volume.USD * conversionRate,
    tokenVolume: metric.volume[token.symbol],
  }));

  return (
    <AsyncTokenVolumeChart
      data={data}
      localCurrency={displayCurrency}
      period={period}
      tokenSymbol={token.symbol}
    />
  );
};

TokenVolume.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
  }).isRequired,
};

export default TokenVolume;
