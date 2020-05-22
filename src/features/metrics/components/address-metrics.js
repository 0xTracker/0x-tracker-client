import React from 'react';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from '../../../constants';
import AddressMetricsChart from './address-metrics-chart';
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
  const [metrics, loading] = useTraderMetrics(address, { granularity, period });
  const conversionRate = useConversionRate();

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map((metric) => ({
    date: new Date(metric.date),
    tradeCount: metric.tradeCount.total,
    tradeVolume: metric.tradeVolume.total * conversionRate,
  }));

  return (
    <AddressMetricsChart
      data={data}
      granularity={granularity}
      keyMetric={keyMetric}
      period={period}
    />
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
