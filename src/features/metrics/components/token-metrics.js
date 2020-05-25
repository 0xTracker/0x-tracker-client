import React from 'react';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from '../../../constants';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import TokenMetricsChart from './token-metrics-chart';
import TokenPricesChart from './token-prices-chart';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useTokenMetrics from '../hooks/use-token-metrics';

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

const TokenMetrics = ({ period, token, type }) => {
  const granularity = determineGranularity(period);
  const [metrics, loadingMetrics] = useTokenMetrics(token.address, {
    granularity,
    period,
  });
  const displayCurrency = useDisplayCurrency();
  const conversionRate = useConversionRate();

  if (loadingMetrics || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map((metric) => ({
    ...metric,
    tradeVolume: {
      USD: metric.tradeVolume.USD * conversionRate,
      token: metric.tradeVolume.token,
    },
  }));

  return type === 'price.close' ? (
    <TokenPricesChart
      data={data}
      granularity={granularity}
      localCurrency={displayCurrency}
      period={period}
      tokenSymbol={token.symbol}
    />
  ) : (
    <TokenMetricsChart
      data={data}
      granularity={granularity}
      localCurrency={displayCurrency}
      period={period}
      tokenSymbol={token.symbol}
      type={type}
    />
  );
};

TokenMetrics.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string,
};

TokenMetrics.defaultProps = {
  type: undefined,
};

export default TokenMetrics;
