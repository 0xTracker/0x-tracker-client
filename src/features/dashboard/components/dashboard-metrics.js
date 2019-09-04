import _ from 'lodash';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import FillCountMetric from './fill-count-metric';
import FillVolumeMetric from './fill-volume-metric';
import TradeVolumeMetric from './trade-volume-metric';
import useNetworkStats from '../../stats/hooks/use-network-stats';
import useRelayerStats from '../../stats/hooks/use-relayer-stats';
import ZRXPriceMetric from './zrx-price-metric';

// Carousel gets loaded lazily because it relies on react-slick
const AsyncDashboardMetricsCarousel = React.lazy(() =>
  import('./dashboard-metrics-carousel'),
);

const DashboardMetrics = ({ className, screenSize }) => {
  const [networkStats] = useNetworkStats();
  const [relayerStats] = useRelayerStats();

  const fees = _.get(networkStats, 'fees.USD');
  const fillCount = _.get(networkStats, 'fills');
  const fillVolume = _.get(networkStats, 'volume');
  const tradeVolume = _.get(relayerStats, 'tradeVolume');

  return screenSize.greaterThan.md ? (
    <Row className={className}>
      <Col lg={3} md={6}>
        <FillVolumeMetric volume={fillVolume} />
      </Col>
      <Col lg={3} md={6}>
        <TradeVolumeMetric volume={tradeVolume} />
      </Col>
      <Col lg={3} md={6}>
        <FillCountMetric fillCount={fillCount} />
      </Col>
      <Col lg={3} md={6}>
        <ZRXPriceMetric />
      </Col>
    </Row>
  ) : (
    <AsyncDashboardMetricsCarousel
      className={className}
      fees={fees}
      fillCount={fillCount}
      fillVolume={fillVolume}
      tradeVolume={tradeVolume}
    />
  );
};

DashboardMetrics.propTypes = {
  className: PropTypes.string,
  screenSize: PropTypes.shape({
    greaterThan: PropTypes.shape({
      md: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

DashboardMetrics.defaultProps = {
  className: undefined,
};

const mapStateToProps = state => ({
  screenSize: state.screen,
});

export default connect(mapStateToProps)(DashboardMetrics);
