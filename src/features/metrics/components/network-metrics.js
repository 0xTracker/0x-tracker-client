import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import AsyncNetworkMetricsChart from './async-network-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useNetworkMetrics from '../hooks/use-network-metrics';

const NetworkMetrics = ({ period, type }) => {
  const [autoReload, setAutoReload] = React.useState(true);
  const [metrics, loading] = useNetworkMetrics({ period }, { autoReload });
  const conversionRate = useConversionRate();

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map(metric => ({
    date: new Date(metric.date),
    fillCount: metric.fillCount,
    fillVolume: (parseFloat(metric.fillVolume) || 0) * conversionRate,
    tradeCount: metric.tradeCount,
    tradeVolume: (parseFloat(metric.tradeVolume) || 0) * conversionRate,
  }));

  return (
    <AsyncNetworkMetricsChart
      data={data}
      onBrushChange={() => {
        setAutoReload(false);
      }}
      period={period}
      type={type}
    />
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
