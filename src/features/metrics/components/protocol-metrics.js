import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import ProtocolMetricsChart from './protocol-metrics-chart';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import LoadingIndicator from '../../../components/loading-indicator';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useProtocolMetrics from '../hooks/use-protocol-metrics';

const determineGranularity = (period) => {
  if (period === TIME_PERIOD.WEEK || period === TIME_PERIOD.MONTH) {
    return 'day';
  }

  if (period === TIME_PERIOD.ALL) {
    return 'month';
  }

  if (period === TIME_PERIOD.YEAR) {
    return 'week';
  }

  return 'hour';
};

const ProtocolMetrics = ({ period }) => {
  const granularity = determineGranularity(period);
  const [brushActive, setBrushActive] = React.useState(false);
  const [metrics, loading] = useProtocolMetrics(
    { granularity, period },
    { autoReload: !brushActive },
  );
  const conversionRate = useConversionRate();
  const displayCurrency = useDisplayCurrency();

  // This is a quick and dirty hack to implement brush resetting because Recharts
  // doesn't allow us to control the brush indexes after mount. It works by modifying
  // a chartKey value which is used as the key prop on AsyncNetworkMetricsChart below.
  // When this key changes it will force a rerender of the chart.
  const [chartKey, setChartKey] = React.useState(Date.now());
  const handleBrushReset = () => {
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
      (metrics || []).map((metric) => ({
        date: new Date(metric.date),
        stats: metric.stats.map((stat) => ({
          ...stat,
          tradeVolume: (parseFloat(stat.tradeVolume) || 0) * conversionRate,
        })),
      })),
    [metrics, conversionRate],
  );

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  return (
    <BrushableChartContainer
      brushActive={brushActive}
      onBrushReset={handleBrushReset}
    >
      <ProtocolMetricsChart
        currency={displayCurrency}
        data={data}
        granularity={granularity}
        key={chartKey}
        onBrushChange={handleBrushChange}
        period={period}
      />
    </BrushableChartContainer>
  );
};

ProtocolMetrics.propTypes = {
  period: PropTypes.string,
};

ProtocolMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
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
  <ProtocolMetrics key={`${period}_${type}`} period={period} type={type} />
);
