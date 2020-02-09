import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD } from '../../../constants';
import AsyncNetworkMetricsChart from './async-network-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import ResetChartButton from '../../../components/reset-chart-button';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useNetworkMetrics from '../hooks/use-network-metrics';

const Container = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

const NetworkMetrics = ({ period, type }) => {
  const [brushActive, setBrushActive] = React.useState(false);
  const [metrics, loading] = useNetworkMetrics(
    { period },
    { autoReload: !brushActive },
  );
  const conversionRate = useConversionRate();
  const displayCurrency = useDisplayCurrency();

  // This is a quick and dirty hack to implement brush resetting because Recharts
  // doesn't allow us to control the brush indexes after mount. It works by modifying
  // a chartKey value which is used as the key prop on AsyncNetworkMetricsChart below.
  // When this key changes it will force a rerender of the chart.
  const [chartKey, setChartKey] = React.useState(Date.now());
  const handleResetClick = () => {
    setBrushActive(false);
    setChartKey(Date.now());
  };

  // The NetworkMetricsChart is designed to only rerender when one of its props changes. This
  // is to prevent the brush position resetting when chart data hasn't changed. Because of this
  // we must memoize the `handleBrushChange` and `data` props to ensure their references don't
  // change each time this component rerenders (e.g. after the brushActive state changes).
  const handleBrushChange = React.useCallback(() => {
    setBrushActive(true);
  }, []);

  const data = React.useMemo(
    () =>
      (metrics || []).map(metric => ({
        activeMakers: metric.activeMakers,
        activeTakers: metric.activeTakers,
        activeTraders: metric.activeTraders,
        date: new Date(metric.date),
        fillCount: metric.fillCount,
        fillVolume: (parseFloat(metric.fillVolume) || 0) * conversionRate,
        protocolFees:
          (parseFloat(metric.protocolFees.USD) || 0) * conversionRate,
        protocolFeesETH: metric.protocolFees.ETH,
        tradeCount: metric.tradeCount,
        tradeVolume: (parseFloat(metric.tradeVolume) || 0) * conversionRate,
      })),
    [metrics, conversionRate],
  );

  if (loading || conversionRate === undefined) {
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
      <AsyncNetworkMetricsChart
        currency={displayCurrency}
        data={data}
        key={chartKey}
        onBrushChange={handleBrushChange}
        period={period}
        type={type}
      />
    </Container>
  );
};

NetworkMetrics.propTypes = {
  period: PropTypes.string,
  type: PropTypes.string,
};

NetworkMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume',
};

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export, react/prop-types, react/no-multi-comp
export default ({ period, type }) => (
  /*
    This is a hack to ensure autoReload is reset whenever the period or type props are changed.
    By using a key composed of period and type we can ensure the metrics component will remount
    (and therefore reset state) whenever one of these props changes.

    Ideally the autoReload state would be lifted up the component treet but I'm being lazy for
    the time being because of the additional work involved.
  */
  <NetworkMetrics key={`${period}_${type}`} period={period} type={type} />
);
