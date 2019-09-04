import React from 'react';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from '../../../constants';
import AsyncNetworkFeesChart from './async-network-fees-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useNetworkMetrics from '../hooks/use-network-metrics';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useConversionRate from '../../currencies/hooks/use-conversion-rate';

const NetworkFees = ({ period, relayerId }) => {
  const networkMetrics = useNetworkMetrics({ period, relayerId });
  const displayCurrency = useDisplayCurrency();
  const conversionRate = useConversionRate();

  if (networkMetrics.error) {
    throw networkMetrics.error;
  }

  if (networkMetrics.loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = networkMetrics.data.map(metric => ({
    date: new Date(metric.date),
    fees: metric.fees.ZRX,
    localizedFees: metric.fees.USD * conversionRate,
  }));

  return (
    <AsyncNetworkFeesChart
      data={data}
      localCurrency={displayCurrency}
      period={period}
    />
  );
};

NetworkFees.propTypes = {
  period: PropTypes.string,
  relayerId: PropTypes.string,
};

NetworkFees.defaultProps = {
  period: TIME_PERIOD.MONTH,
  relayerId: undefined,
};

export default NetworkFees;
