import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from '../../../constants';
import { METRIC_TYPE } from '../constants';
import { getNetworkMetrics } from '../selectors';
import AsyncNetworkFeesChart from './async-network-fees-chart';
import AutoReload from '../../../util/auto-reload';
import LoadingIndicator from '../../../components/loading-indicator';
import withConversionRate from '../../currencies/components/with-conversion-rate';

class FeesChart extends PureComponent {
  componentDidMount() {
    this.loadData();
    AutoReload.addListener(this.loadData);
  }

  componentDidUpdate(prevProps) {
    const { period, relayerId } = this.props;

    if (prevProps.period !== period || prevProps.relayerId !== relayerId) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    AutoReload.removeListener(this.loadData);
  }

  loadData = () => {
    const { fetchMetrics, period, relayerId } = this.props;

    fetchMetrics({
      filter: { relayer: relayerId },
      metricType: METRIC_TYPE.NETWORK,
      period,
    });
  };

  render() {
    const { conversionRate, displayCurrency, metrics, period } = this.props;

    if (_.some([metrics, conversionRate], _.isUndefined)) {
      return <LoadingIndicator centered />;
    }

    const data = metrics.map(metric => ({
      date: new Date(metric.date),
      fees: metric.fees.ZRX,
      localizedFees: metric.fees[displayCurrency],
    }));

    return <AsyncNetworkFeesChart {...{ data, displayCurrency, period }} />;
  }
}

FeesChart.propTypes = {
  conversionRate: PropTypes.number,
  displayCurrency: PropTypes.string.isRequired,
  fetchMetrics: PropTypes.func.isRequired,
  metrics: PropTypes.array,
  period: PropTypes.string,
  relayerId: PropTypes.string,
};

FeesChart.defaultProps = {
  conversionRate: undefined,
  metrics: undefined,
  period: TIME_PERIOD.MONTH,
  relayerId: undefined,
};

const mapStateToProps = (state, ownProps) => ({
  metrics: getNetworkMetrics(state, {
    period: ownProps.period || FeesChart.defaultProps.period,
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

export default enhance(FeesChart);
