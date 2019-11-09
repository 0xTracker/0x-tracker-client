import React from 'react';
import PropTypes from 'prop-types';

import AsyncTokenVolumeChart from './async-token-volume-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useTokenMetrics from '../hooks/use-token-metrics';

const TokenVolume = ({ period, token }) => {
  const [metrics, loadingMetrics] = useTokenMetrics(token.address, {
    period,
  });
  const displayCurrency = useDisplayCurrency();
  const conversionRate = useConversionRate();

  if (loadingMetrics || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map(metric => ({
    date: new Date(metric.date),
    localizedVolume: metric.fillVolume.USD * conversionRate,
    tokenVolume: metric.fillVolume.token,
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
