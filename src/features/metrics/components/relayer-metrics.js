import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD } from '../../../constants';
import AsyncRelayerMetricsChart from './async-relayer-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import ResetChartButton from '../../../components/reset-chart-button';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useRelayerMetrics from '../hooks/use-relayer-metrics';

const Container = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

const RelayerMetrics = ({ period, relayerId, type }) => {
  const [brushActive, setBrushActive] = React.useState(false);
  const [metrics, loading] = useRelayerMetrics(
    relayerId,
    { period },
    { autoReload: !brushActive },
  );
  const conversionRate = useConversionRate();

  // This is a quick and dirty hack to implement brush resetting because Recharts
  // doesn't allow us to control the brush indexes after mount. It works by modifying
  // a chartKey value which is used as the key prop on AsyncRelayerMetricsChart below.
  // When this key changes it will force a rerender of the chart.
  const [chartKey, setChartKey] = React.useState(Date.now());
  const handleResetClick = () => {
    setBrushActive(false);
    setChartKey(Date.now());
  };

  // The RelayerMetricsChart is designed to only rerender when one of its props changes. This
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
        fillCount: metric.fillCount,
        fillVolume: (parseFloat(metric.fillVolume) || 0) * conversionRate,
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
      <AsyncRelayerMetricsChart
        data={data}
        key={chartKey}
        onBrushChange={handleBrushChange}
        period={period}
        type={type}
      />
    </Container>
  );
};

RelayerMetrics.propTypes = {
  period: PropTypes.string,
  relayerId: PropTypes.string.isRequired,
  type: PropTypes.string,
};

RelayerMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume',
};

export default RelayerMetrics;
