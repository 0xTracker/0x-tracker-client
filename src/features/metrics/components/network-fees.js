import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as metricsActionCreators from '../actions';
import { TIME_PERIOD } from '../../../constants';
import { METRIC_TYPE } from '../constants';
import { getNetworkMetrics } from '../selectors';
import { getDisplayCurrency } from '../../currencies/selectors';
import LoadingIndicator from '../../../components/loading-indicator';
import NetworkFeesChart from './network-fees-chart';

class FeesChart extends PureComponent {
  async componentDidMount() {
    await this.loadData();
  }

  async componentDidUpdate(prevProps) {
    const { autoReloadKey, period, relayerId } = this.props;

    if (
      prevProps.autoReloadKey !== autoReloadKey ||
      prevProps.period !== period ||
      prevProps.relayerId !== relayerId
    ) {
      await this.loadData();
    }
  }

  async loadData() {
    const { fetchMetrics, period, relayerId } = this.props;

    fetchMetrics(METRIC_TYPE.NETWORK, period, { relayerId });
  }

  render() {
    const { displayCurrency, metrics, period } = this.props;

    if (metrics === undefined) {
      return <LoadingIndicator isCentered />;
    }

    const data = metrics.map(metric => ({
      date: new Date(metric.date),
      fees: metric.fees.ZRX,
      localizedFees: metric.fees[displayCurrency],
    }));

    return <NetworkFeesChart {...{ data, displayCurrency, period }} />;
  }
}

FeesChart.propTypes = {
  autoReloadKey: PropTypes.string,
  displayCurrency: PropTypes.string.isRequired,
  fetchMetrics: PropTypes.func.isRequired,
  metrics: PropTypes.array,
  period: PropTypes.string,
  relayerId: PropTypes.string,
};

FeesChart.defaultProps = {
  autoReloadKey: undefined,
  metrics: undefined,
  period: TIME_PERIOD.MONTH,
  relayerId: undefined,
};

const mapStateToProps = (state, ownProps) => ({
  autoReloadKey: state.autoReload.key,
  displayCurrency: getDisplayCurrency(state),
  metrics: getNetworkMetrics(state, {
    period: ownProps.period || FeesChart.defaultProps.period,
    relayerId: ownProps.relayerId,
  }),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(metricsActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeesChart);
