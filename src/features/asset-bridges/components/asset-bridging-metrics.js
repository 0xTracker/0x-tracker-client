import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import AssetBridgingMetricsChart from './asset-bridging-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import useAssetBridgingMetrics from '../hooks/use-asset-bridging-metrics';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

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

const AssetBridgingMetrics = ({ period, type }) => {
  const granularity = determineGranularity(period);
  const [metrics, loading] = useAssetBridgingMetrics({ granularity, period });
  const conversionRate = useConversionRate();
  const displayCurrency = useDisplayCurrency();

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map((metric) => ({
    date: new Date(metric.date),
    tradeCount: metric.tradeCount,
    tradeVolume: (parseFloat(metric.tradeVolume) || 0) * conversionRate,
  }));

  return (
    <AssetBridgingMetricsChart
      currency={displayCurrency}
      data={data}
      granularity={granularity}
      period={period}
      type={type}
    />
  );
};

AssetBridgingMetrics.propTypes = {
  period: PropTypes.string,
  type: PropTypes.string,
};

AssetBridgingMetrics.defaultProps = {
  period: TIME_PERIOD.MONTH,
  type: 'tradeVolume',
};

export default AssetBridgingMetrics;
