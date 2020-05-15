import React from 'react';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from '../../../constants';
import BrushableChartContainer from '../../../components/brushable-chart-container';
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
  const [brushActive, setBrushActive] = React.useState(false);
  const [metrics, loadingMetrics] = useTokenMetrics(
    token.address,
    {
      granularity,
      period,
    },
    { autoReload: !brushActive },
  );
  const displayCurrency = useDisplayCurrency();
  const conversionRate = useConversionRate();

  // This is a quick and dirty hack to implement brush resetting because Recharts
  // doesn't allow us to control the brush indexes after mount. It works by modifying
  // a chartKey value which is used as the key prop on AsyncTokenVolumeChart below.
  // When this key changes it will force a rerender of the chart.
  const [chartKey, setChartKey] = React.useState(Date.now());
  const handleResetClick = () => {
    setBrushActive(false);
    setChartKey(Date.now());
  };

  // The TokenVolumeChart is designed to only rerender when one of its props changes. This
  // is to prevent the brush position resetting when chart data hasn't changed. Because of this
  // we must memoize the `handleBrushChange` and `data` props to ensure their references don't
  // change each time this component rerenders (e.g. after the brushActive state changes).
  const handleBrushChange = React.useCallback(() => {
    setBrushActive(true);
  }, []);

  const data = React.useMemo(
    () =>
      (metrics || []).map((metric) => ({
        ...metric,
        tradeVolume: {
          USD: metric.tradeVolume.USD * conversionRate,
          token: metric.tradeVolume.token,
        },
      })),
    [metrics, conversionRate],
  );

  if (loadingMetrics || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  return (
    <BrushableChartContainer
      brushActive={brushActive}
      onBrushReset={handleResetClick}
    >
      {type === 'price.close' ? (
        <TokenPricesChart
          data={data}
          granularity={granularity}
          key={chartKey}
          localCurrency={displayCurrency}
          onBrushChange={handleBrushChange}
          period={period}
          tokenSymbol={token.symbol}
        />
      ) : (
        <TokenMetricsChart
          data={data}
          granularity={granularity}
          key={chartKey}
          localCurrency={displayCurrency}
          onBrushChange={handleBrushChange}
          period={period}
          tokenSymbol={token.symbol}
          type={type}
        />
      )}
    </BrushableChartContainer>
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
