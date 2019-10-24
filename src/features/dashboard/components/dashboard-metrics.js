import _ from 'lodash';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import FillCountMetric from './fill-count-metric';
import FillVolumeMetric from './fill-volume-metric';
import TradeVolumeMetric from './trade-volume-metric';
import useBreakpoint from '../../../hooks/use-breakpoint';
import useNetworkStats from '../../stats/hooks/use-network-stats';
import useRelayerStats from '../../stats/hooks/use-relayer-stats';
import ZRXPriceMetric from './zrx-price-metric';

// Carousel gets loaded lazily because it relies on react-slick
const AsyncDashboardMetricsCarousel = React.lazy(() =>
  import('./dashboard-metrics-carousel'),
);

const DashboardMetrics = ({ className }) => {
  const [networkStats] = useNetworkStats();
  const [relayerStats] = useRelayerStats();
  const breakpoint = useBreakpoint();

  const fillCount = _.get(networkStats, 'fills');
  const fillVolume = _.get(networkStats, 'volume');
  const tradeVolume = _.get(relayerStats, 'tradeVolume');

  return breakpoint.greaterThan('md') ? (
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
      fillCount={fillCount}
      fillVolume={fillVolume}
      tradeVolume={tradeVolume}
    />
  );
};

DashboardMetrics.propTypes = {
  className: PropTypes.string,
};

DashboardMetrics.defaultProps = {
  className: undefined,
};

export default DashboardMetrics;
