import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Col, Row } from 'reactstrap';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { getNetworkStats } from '../../stats/selectors';
import DashboardMetric from './dashboard-metric';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import withConversionRate from '../../currencies/components/with-conversion-rate';
import ZRXPriceMetric from './zrx-price-metric';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

class DashboardMetrics extends React.PureComponent {
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { autoReloadKey, displayCurrency } = this.props;
    const autoReload = prevProps.autoReloadKey !== autoReloadKey;

    if (autoReload || prevProps.displayCurrency !== displayCurrency) {
      this.loadData({ loadStats: autoReload });
    }
  }

  loadData = () => {
    const { fetchNetworkStats } = this.props;

    fetchNetworkStats({ period: TIME_PERIOD.DAY });
  };

  render() {
    const { className, displayCurrency, networkStats } = this.props;
    const { volume } = _.pick(networkStats, 'volume');
    const fees = _.get(networkStats, `fees[${displayCurrency}]`);
    const tradeCount = _.get(networkStats, 'trades');

    return (
      <Row className={className}>
        <Col lg={3} md={6}>
          <DashboardMetric title="Network Volume (24H)">
            {_.isNumber(volume) ? (
              <LocalisedAmount
                amount={volume}
                loadingIndicator={loadingIndicator}
              />
            ) : (
              loadingIndicator
            )}
          </DashboardMetric>
        </Col>
        <Col lg={3} md={6}>
          <DashboardMetric title="Network Fees (24H)">
            {_.isNumber(fees) ? (
              <LocalisedAmount
                amount={fees}
                loadingIndicator={loadingIndicator}
              />
            ) : (
              loadingIndicator
            )}
          </DashboardMetric>
        </Col>
        <Col lg={3} md={6}>
          <DashboardMetric title="Trades (24H)">
            {_.isNumber(tradeCount)
              ? numeral(tradeCount).format('0,0')
              : loadingIndicator}
          </DashboardMetric>
        </Col>
        <Col lg={3} md={6}>
          <ZRXPriceMetric />
        </Col>
      </Row>
    );
  }
}

DashboardMetrics.propTypes = {
  autoReloadKey: PropTypes.string,
  className: PropTypes.string,
  displayCurrency: PropTypes.string.isRequired,
  fetchNetworkStats: PropTypes.func.isRequired,
  networkStats: PropTypes.object,
};

DashboardMetrics.defaultProps = {
  autoReloadKey: undefined,
  className: undefined,
  networkStats: undefined,
};

const mapStateToProps = state => ({
  autoReloadKey: state.autoReload.key,
  displayCurrency: state.preferences.currency,
  networkStats: getNetworkStats(state, { period: TIME_PERIOD.DAY }),
});

const mapDispatchToProps = dispatch => ({
  fetchNetworkStats: dispatch.stats.fetchNetworkStats,
});

const enhance = compose(
  withConversionRate,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(DashboardMetrics);
