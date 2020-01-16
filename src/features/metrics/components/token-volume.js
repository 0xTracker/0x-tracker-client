import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AsyncTokenVolumeChart from './async-token-volume-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import ResetChartButton from '../../../components/reset-chart-button';
import sharedPropTypes from '../../../prop-types';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useTokenMetrics from '../hooks/use-token-metrics';

const Container = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

const TokenVolume = ({ period, token }) => {
  const [brushActive, setBrushActive] = React.useState(false);
  const [metrics, loadingMetrics] = useTokenMetrics(
    token.address,
    {
      period,
    },
    { autoReload: !brushActive },
  );
  const displayCurrency = useDisplayCurrency();
  const conversionRate = useConversionRate();

  // This is a quick and dirty hack to implement brush resetting because Recharts
  // doesn't allow us to control the brush indexes after mount. It works by modifying
  // a chartKey value which is used as the key prop on AsyncAddressMetricsChart below.
  // When this key changes it will force a rerender of the chart.
  const [chartKey, setChartKey] = React.useState(Date.now());
  const handleResetClick = () => {
    setBrushActive(false);
    setChartKey(Date.now());
  };

  // The AddressMetricsChart is designed to only rerender when one of its props changes. This
  // is to prevent the brush position resetting when chart data hasn't changed. Because of this
  // we must memoize the `handleBrushChange` and `data` props to ensure their references don't
  // change each time this component rerenders (e.g. after the brushActive state changes).
  const handleBrushChange = React.useCallback(() => {
    setBrushActive(true);
  }, []);

  const data = React.useMemo(
    () =>
      (metrics || []).map(metric => ({
        date: new Date(metric.date),
        localizedVolume: metric.fillVolume.USD * conversionRate,
        tokenVolume: metric.fillVolume.token,
      })),
    [metrics, conversionRate],
  );

  if (loadingMetrics || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  return (
    <Container>
      {brushActive && (
        <ResetChartButton
          css="position: absolute; right: 0; z-index: 10;"
          onClick={handleResetClick}
        />
      )}
      <AsyncTokenVolumeChart
        data={data}
        key={chartKey}
        localCurrency={displayCurrency}
        onBrushChange={handleBrushChange}
        period={period}
        tokenSymbol={token.symbol}
      />
    </Container>
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
