import React from 'react';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from '../../../constants';
import AsyncAddressMetricsChart from './async-address-metrics-chart';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useTraderMetrics from '../hooks/use-trader-metrics';

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

const AddressMetrics = ({ address, keyMetric, period }) => {
  const granularity = determineGranularity(period);
  const [brushActive, setBrushActive] = React.useState(false);
  const [metrics, loading] = useTraderMetrics(
    address,
    { granularity, period },
    { autoReload: !brushActive },
  );
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
      (metrics || []).map((metric) => ({
        date: new Date(metric.date),
        tradeCount: metric.tradeCount.total,
        tradeVolume: metric.tradeVolume.total * conversionRate,
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
      <AsyncAddressMetricsChart
        data={data}
        granularity={granularity}
        key={chartKey}
        keyMetric={keyMetric}
        onBrushChange={handleBrushChange}
        period={period}
      />
    </BrushableChartContainer>
  );
};

AddressMetrics.propTypes = {
  address: PropTypes.string.isRequired,
  keyMetric: PropTypes.string, // eslint-disable-line react/require-default-props
  period: sharedPropTypes.timePeriod,
};

AddressMetrics.defaultProps = {
  period: undefined,
};

export default AddressMetrics;
