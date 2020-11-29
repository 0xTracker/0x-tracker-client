import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import useAppMetrics from '../hooks/use-app-metrics';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';
import NetworkVolumeChart from '../../metrics/components/network-volume-chart';
import sharedPropTypes from '../../../prop-types';

const AppTradingVolume = ({ appId, granularity, period, type }) => {
  const conversionRate = useConversionRate();

  const [metrics, loading] = useAppMetrics(appId, {
    granularity,
    period,
  });

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map((metric) => ({
    avgTradeSize:
      ((parseFloat(metric.tradeVolume.total) || 0) * conversionRate) /
      metric.tradeCount.total,
    date: new Date(metric.date),
    tradeCount: metric.tradeCount.total,
    tradeVolume: metric.tradeVolume.total * conversionRate,
  }));

  return (
    <NetworkVolumeChart
      data={data}
      granularity={granularity}
      period={period}
      type={type}
    />
  );
};

AppTradingVolume.propTypes = {
  appId: PropTypes.string.isRequired,
  granularity: sharedPropTypes.granularity.isRequired,
  period: sharedPropTypes.timePeriod.isRequired,
  type: PropTypes.string.isRequired,
};

export default AppTradingVolume;
