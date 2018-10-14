import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getDisplayCurrency } from '../../currencies/selectors';
import { getTokenVolumeMetrics } from '../selectors';
import { METRIC_TYPE } from '../constants';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import TokenVolumeChart from './token-volume-chart';
import withConversionRate from '../../currencies/components/with-conversion-rate';

class TokenVolume extends Component {
  async componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps) {
    const { autoReloadKey, period, token } = this.props;

    if (
      prevProps.autoReloadKey !== autoReloadKey ||
      prevProps.period !== period ||
      prevProps.token !== token
    ) {
      this.fetchData();
    }
  }

  fetchData() {
    const { fetchMetrics, period, token } = this.props;

    fetchMetrics({
      metricType: METRIC_TYPE.TOKEN_VOLUME,
      period,
      filter: { token: token.address },
    });
  }

  render() {
    const {
      conversionRate,
      displayCurrency,
      metrics,
      period,
      token,
    } = this.props;

    if (_.some([metrics, conversionRate], _.isUndefined)) {
      return <LoadingIndicator centered />;
    }

    const data = metrics.map(metric => ({
      date: new Date(metric.date),
      tokenVolume: metric.volume[token.symbol],
      volume: metric.volume[displayCurrency],
    }));

    return (
      <TokenVolumeChart
        data={data}
        displayCurrency={displayCurrency}
        period={period}
        token={token.symbol}
      />
    );
  }
}

TokenVolume.propTypes = {
  autoReloadKey: PropTypes.string,
  conversionRate: PropTypes.number,
  displayCurrency: PropTypes.string.isRequired,
  fetchMetrics: PropTypes.func.isRequired,
  metrics: PropTypes.array,
  period: sharedPropTypes.timePeriod.isRequired,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
  }).isRequired,
};

TokenVolume.defaultProps = {
  autoReloadKey: undefined,
  conversionRate: undefined,
  metrics: undefined,
};

const mapStateToProps = (state, ownProps) => ({
  autoReloadKey: state.autoReload.key,
  displayCurrency: getDisplayCurrency(state),
  metrics: getTokenVolumeMetrics(ownProps.token.address, ownProps.period)(
    state,
  ),
});

const mapDispatchToProps = dispatch => ({
  fetchMetrics: dispatch.metrics.fetch,
});

const enhance = compose(
  withConversionRate,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(TokenVolume);
