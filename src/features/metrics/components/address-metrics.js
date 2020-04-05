import React from 'react';
import PropTypes from 'prop-types';

import AsyncAddressMetricsChart from './async-address-metrics-chart';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useTraderMetrics from '../hooks/use-trader-metrics';

const AddressMetrics = ({ address, keyMetric, period }) => {
  const [brushActive, setBrushActive] = React.useState(false);
  const [metrics, loading] = useTraderMetrics(
    address,
    { period },
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
      (metrics || []).map((metric) => ({
        date: new Date(metric.date),
        fillCount: metric.fillCount.total,
        fillVolume: metric.fillVolume.total * conversionRate,
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
        key={chartKey}
        keyMetric={keyMetric}
        localCurrency={displayCurrency}
        onBrushChange={handleBrushChange}
      />
    </BrushableChartContainer>
  );
};

AddressMetrics.propTypes = {
  address: PropTypes.string.isRequired,
  keyMetric: PropTypes.string,
  period: sharedPropTypes.timePeriod.isRequired,
};

AddressMetrics.defaultProps = {
  keyMetric: 'fillVolume',
};

export default AddressMetrics;
