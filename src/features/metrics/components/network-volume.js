import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from '../../../constants';
import { METRIC_TYPE } from '../constants';
import { getNetworkMetrics } from '../selectors';
import { getDisplayCurrency } from '../../currencies/selectors';
import AsyncNetworkVolumeChart from './async-network-volume-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import withConversionRate from '../../currencies/components/with-conversion-rate';

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

    fetchMetrics({
      metricType: METRIC_TYPE.NETWORK,
      period,
      filter: { relayer: relayerId },
    });
  }

  render() {
    const {
      conversionRate,
      displayCurrency,
      metrics,
      period,
      type,
    } = this.props;

    if (_.some([metrics, conversionRate], _.isUndefined)) {
      return <LoadingIndicator centered />;
    }

    const data = metrics.map(metric => ({
      date: new Date(metric.date),
      fills: metric.fills,
      volume: parseFloat(metric.volume) || 0,
    }));

    return (
      <AsyncNetworkVolumeChart
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
  conversionRate: PropTypes.number,
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
  conversionRate: undefined,
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
    relayer: ownProps.relayerId,
  }),
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

export default enhance(NetworkVolume);
