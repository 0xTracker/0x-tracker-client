import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getDisplayCurrency } from '../../currencies/selectors';
import { getTokenVolumeMetrics } from '../selectors';
import { METRIC_TYPE } from '../constants';
import AsyncTokenVolumeChart from './async-token-volume-chart';
import AutoReload from '../../../util/auto-reload';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import withConversionRate from '../../currencies/components/with-conversion-rate';

class TokenVolume extends Component {
  componentDidMount() {
    this.fetchData();
    AutoReload.addListener(this.fetchData);
  }

  componentDidUpdate(prevProps) {
    const { period, token } = this.props;

    if (prevProps.period !== period || prevProps.token !== token) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    AutoReload.removeListener(this.fetchData);
  }

  fetchData = () => {
    const { fetchMetrics, period, token } = this.props;

    fetchMetrics({
      filter: { token: token.address },
      metricType: METRIC_TYPE.TOKEN_VOLUME,
      period,
    });
  };

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
      <AsyncTokenVolumeChart
        data={data}
        displayCurrency={displayCurrency}
        period={period}
        token={token.symbol}
      />
    );
  }
}

TokenVolume.propTypes = {
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
  conversionRate: undefined,
  metrics: undefined,
};

const mapStateToProps = (state, ownProps) => ({
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
