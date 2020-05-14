import PropTypes from 'prop-types';
import React from 'react';

import { METRIC_GRANULARITY, TIME_PERIOD } from '../../../constants';
import MiniBridgeMetricsChart from './mini-bridge-metrics-chart';
import useAssetBridgeMetrics from '../hooks/use-asset-bridge-metrics';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';

const GRANULARITY_LOOKUP = {
  [TIME_PERIOD.DAY]: METRIC_GRANULARITY.HOUR,
  [TIME_PERIOD.WEEK]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.MONTH]: METRIC_GRANULARITY.DAY,
  [TIME_PERIOD.YEAR]: METRIC_GRANULARITY.MONTH,
  [TIME_PERIOD.ALL]: METRIC_GRANULARITY.MONTH,
};

const MiniBridgeMetrics = ({ bridgeAddress, height, period, type, width }) => {
  const [metrics, loading] = useAssetBridgeMetrics(bridgeAddress, {
    granularity: GRANULARITY_LOOKUP[period],
    period,
  });
  const conversionRate = useConversionRate();

  const data = (metrics || []).map((metric) => ({
    date: new Date(metric.date),
    tradeCount: metric.tradeCount,
    tradeVolume: (parseFloat(metric.tradeVolume) || 0) * conversionRate,
  }));

  if (loading || conversionRate === undefined) {
    return null;
  }

  return (
    <MiniBridgeMetricsChart
      data={data}
      fallback={null}
      height={height}
      type={type}
      width={width}
    />
  );
};

MiniBridgeMetrics.propTypes = {
  bridgeAddress: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  period: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.number.isRequired,
};

MiniBridgeMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume',
};

export default MiniBridgeMetrics;
