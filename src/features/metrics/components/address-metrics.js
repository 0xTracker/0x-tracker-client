import React from 'react';
import PropTypes from 'prop-types';

import AsyncAddressMetricsChart from './async-address-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import useAddressMetrics from '../hooks/use-address-metrics';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';

const AddressMetrics = ({ address, keyMetric, period }) => {
  const [metrics, loading] = useAddressMetrics(address, { period });
  const displayCurrency = useDisplayCurrency();
  const conversionRate = useConversionRate();

  if (loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.map(metric => ({
    date: new Date(metric.date),
    fillCount: metric.fillCount,
    fillVolume: metric.fillVolume.USD * conversionRate,
  }));

  return (
    <AsyncAddressMetricsChart
      data={data}
      keyMetric={keyMetric}
      localCurrency={displayCurrency}
      period={period}
    />
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
