import { compose } from 'recompose';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from '../../../constants';
import { getDisplayCurrency } from '../../currencies/selectors';
import AsyncNetworkFeesChart from './async-network-fees-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import withConversionRate from '../../currencies/components/with-conversion-rate';
import useNetworkMetrics from '../hooks/use-network-metrics';

const NetworkFees = ({
  conversionRate,
  displayCurrency,
  period,
  relayerId,
}) => {
  const networkMetrics = useNetworkMetrics({ period, relayerId });

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
      {...{ data, localCurrency: displayCurrency, period }}
    />
  );
};

NetworkFees.propTypes = {
  conversionRate: PropTypes.number,
  displayCurrency: PropTypes.string.isRequired,
  period: PropTypes.string,
  relayerId: PropTypes.string,
};

NetworkFees.defaultProps = {
  conversionRate: undefined,
  period: TIME_PERIOD.MONTH,
  relayerId: undefined,
};

const mapStateToProps = state => ({
  displayCurrency: getDisplayCurrency(state),
});

const enhance = compose(
  withConversionRate,
  connect(mapStateToProps),
);

export default enhance(NetworkFees);
