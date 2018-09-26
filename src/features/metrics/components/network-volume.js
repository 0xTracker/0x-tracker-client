import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as metricsActionCreators from '../actions';
import { TIME_PERIOD } from '../../../constants';
import { METRIC_TYPE } from '../constants';
import { getNetworkMetrics } from '../selectors';
import { getDisplayCurrency } from '../../currencies/selectors';
import LoadingIndicator from '../../../components/loading-indicator';
import NetworkVolumeChart from './network-volume-chart';

class NetworkVolume extends Component {
  async componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps) {
    const { autoReloadKey, period } = this.props;
    if (
      prevProps.autoReloadKey !== autoReloadKey ||
      prevProps.period !== period
    ) {
      this.fetchData();
    }
  }

  fetchData() {
    const { fetchMetrics, period, relayerId } = this.props;

    fetchMetrics(METRIC_TYPE.NETWORK, period, { relayerId });
  }

  render() {
    const { displayCurrency, metrics, period, type } = this.props;

    if (metrics === undefined) {
      return <LoadingIndicator isCentered />;
    }

    const data = metrics.map(metric => ({
      date: new Date(metric.date),
      fills: metric.fills,
      volume: parseFloat(metric.volume) || 0,
    }));

    return (
      <NetworkVolumeChart
        data={data}
        displayCurrency={displayCurrency}
        period={period}
        type={type}
      />
    );
  }
}

NetworkVolume.propTypes = {
  autoReloadKey: PropTypes.string,
  displayCurrency: PropTypes.string.isRequired,
  fetchMetrics: PropTypes.func.isRequired,
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      fills: PropTypes.number.isRequired,
      volume: PropTypes.number,
    }),
  ),
  period: PropTypes.string,
  relayerId: PropTypes.string,
  type: PropTypes.string,
};

NetworkVolume.defaultProps = {
  autoReloadKey: undefined,
  metrics: undefined,
  period: TIME_PERIOD.MONTH,
  relayerId: undefined,
  type: 'volume',
};

const mapStateToProps = (state, ownProps) => ({
  autoReloadKey: state.autoReload.key,
  displayCurrency: getDisplayCurrency(state),
  metrics: getNetworkMetrics(state, {
    period: ownProps.period || NetworkVolume.defaultProps.period,
    relayerId: ownProps.relayerId,
  }),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(metricsActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NetworkVolume);
