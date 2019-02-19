import { compose } from 'recompose';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import {
  getDisplayCurrency,
  getConversionRate,
} from '../../currencies/selectors';
import AsyncTokenVolumeChart from './async-token-volume-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import useTokenVolumeMetrics from '../hooks/use-token-volume-metrics';

const TokenVolume = ({ conversionRate, displayCurrency, period, token }) => {
  const metrics = useTokenVolumeMetrics(token.address, { period });

  if (metrics.loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.data.map(metric => ({
    date: new Date(metric.date),
    localizedVolume: metric.volume.USD * conversionRate,
    tokenVolume: metric.volume[token.symbol],
  }));

  return (
    <AsyncTokenVolumeChart
      data={data}
      localCurrency={displayCurrency}
      period={period}
      tokenSymbol={token.symbol}
    />
  );
};

TokenVolume.propTypes = {
  conversionRate: PropTypes.number,
  displayCurrency: PropTypes.string.isRequired,
  period: sharedPropTypes.timePeriod.isRequired,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
  }).isRequired,
};

TokenVolume.defaultProps = {
  conversionRate: undefined,
};

const mapStateToProps = state => ({
  conversionRate: getConversionRate(state),
  displayCurrency: getDisplayCurrency(state),
});

const enhance = compose(connect(mapStateToProps));

export default enhance(TokenVolume);
