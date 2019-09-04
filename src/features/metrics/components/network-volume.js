import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { getConversionRate } from '../../currencies/selectors';
import AsyncNetworkVolumeChart from './async-network-volume-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useNetworkMetrics from '../hooks/use-network-metrics';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const NetworkVolume = ({ conversionRate, period, relayerId, type }) => {
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
    fills: metric.fills,
    volume: (parseFloat(metric.volume) || 0) * conversionRate,
  }));

  return (
    <AsyncNetworkVolumeChart
      data={data}
      displayCurrency={displayCurrency}
      period={period}
      type={type}
    />
  );
};

NetworkVolume.propTypes = {
  conversionRate: PropTypes.number,
  period: PropTypes.string,
  relayerId: PropTypes.string,
  type: PropTypes.string,
};

NetworkVolume.defaultProps = {
  conversionRate: undefined,
  period: TIME_PERIOD.MONTH,
  relayerId: undefined,
  type: 'volume',
};

const mapStateToProps = state => ({
  conversionRate: getConversionRate(state),
});

export default connect(mapStateToProps)(NetworkVolume);
