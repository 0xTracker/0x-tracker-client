import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import LoadingIndicator from '../../../components/loading-indicator';
import RelayerMetricsChart from './relayer-metrics-chart';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useRelayerMetrics from '../hooks/use-relayer-metrics';

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

const RelayerMetrics = ({ period, relayerId, type }) => {
  const granularity = determineGranularity(period);
  const [brushActive, setBrushActive] = React.useState(false);
  const [metrics, loading] = useRelayerMetrics(
    relayerId,
    { granularity, period },
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
      (metrics || []).map((metric) => ({
        ...metric,
        date: new Date(metric.date),
        tradeVolume: (parseFloat(metric.tradeVolume) || 0) * conversionRate,
      })),
    [metrics, conversionRate],
  );

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  return (
    <BrushableChartContainer
      brushActive={brushActive}
      onBrushReset={handleResetClick}
    >
      <RelayerMetricsChart
        data={data}
        granularity={granularity}
        key={chartKey}
        onBrushChange={handleBrushChange}
        period={period}
        type={type}
      />
    </BrushableChartContainer>
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
