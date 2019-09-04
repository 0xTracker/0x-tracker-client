import { compose } from 'recompose';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { getConversionRate } from '../../currencies/selectors';
import AsyncTokenVolumeChart from './async-token-volume-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import useTokenVolumeMetrics from '../hooks/use-token-volume-metrics';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const TokenVolume = ({ conversionRate, period, token }) => {
  const metrics = useTokenVolumeMetrics(token.address, { period });
  const displayCurrency = useDisplayCurrency();

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
});

const enhance = compose(connect(mapStateToProps));

export default enhance(TokenVolume);
