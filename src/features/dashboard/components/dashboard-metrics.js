import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { getNetworkStats } from '../../stats/selectors';
import AutoReload from '../../../util/auto-reload';
import NetworkFeesMetric from './network-fees-metric';
import NetworkVolumeMetric from './network-volume-metric';
import TradeCountMetric from './trade-count-metric';
import ZRXPriceMetric from './zrx-price-metric';

// Carousel gets loaded lazily because it relies on react-slick
const AsyncDashboardMetricsCarousel = React.lazy(() =>
  import('./dashboard-metrics-carousel'),
);

class DashboardMetrics extends React.PureComponent {
  componentDidMount() {
    this.loadData();
    AutoReload.addListener(this.loadData);
  }

  componentDidUpdate(prevProps) {
    const { displayCurrency } = this.props;

    if (prevProps.displayCurrency !== displayCurrency) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    AutoReload.removeListener(this.loadData);
  }

  loadData = () => {
    const { fetchNetworkStats } = this.props;

    fetchNetworkStats({ period: TIME_PERIOD.DAY });
  };

  render() {
    const { className, displayCurrency, networkStats, screenSize } = this.props;
    const { volume } = _.pick(networkStats, 'volume');
    const fees = _.get(networkStats, `fees[${displayCurrency}]`);
    const tradeCount = _.get(networkStats, 'fills');

    return screenSize.greaterThan.md ? (
      <Row className={className}>
        <Col lg={3} md={6}>
          <NetworkVolumeMetric volume={volume} />
        </Col>
        <Col lg={3} md={6}>
          <NetworkFeesMetric fees={fees} />
        </Col>
        <Col lg={3} md={6}>
          <TradeCountMetric tradeCount={tradeCount} />
        </Col>
        <Col lg={3} md={6}>
          <ZRXPriceMetric />
        </Col>
      </Row>
    ) : (
      <AsyncDashboardMetricsCarousel
        className={className}
        fees={fees}
        tradeCount={tradeCount}
        volume={volume}
      />
    );
  }
}

DashboardMetrics.propTypes = {
  className: PropTypes.string,
  displayCurrency: PropTypes.string.isRequired,
  fetchNetworkStats: PropTypes.func.isRequired,
  networkStats: PropTypes.object,
  screenSize: PropTypes.shape({
    greaterThan: PropTypes.shape({
      md: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

DashboardMetrics.defaultProps = {
  className: undefined,
  networkStats: undefined,
};

const mapStateToProps = state => ({
  displayCurrency: state.preferences.currency,
  networkStats: getNetworkStats(state, { period: TIME_PERIOD.DAY }),
  screenSize: state.screen,
});

const mapDispatchToProps = dispatch => ({
  fetchNetworkStats: dispatch.stats.fetchNetworkStats,
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(DashboardMetrics);
