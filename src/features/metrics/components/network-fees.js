import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from '../../../constants';
import { getConversionRate } from '../../currencies/selectors';
import AsyncNetworkFeesChart from './async-network-fees-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useNetworkMetrics from '../hooks/use-network-metrics';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const NetworkFees = ({ conversionRate, period, relayerId }) => {
  const networkMetrics = useNetworkMetrics({ period, relayerId });
  const displayCurrency = useDisplayCurrency();

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
  conversionRate: PropTypes.number,
  period: PropTypes.string,
  relayerId: PropTypes.string,
};

NetworkFees.defaultProps = {
  conversionRate: undefined,
  period: TIME_PERIOD.MONTH,
  relayerId: undefined,
};

const mapStateToProps = state => ({
  conversionRate: getConversionRate(state),
});

export default connect(mapStateToProps)(NetworkFees);
