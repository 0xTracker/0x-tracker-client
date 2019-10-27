import _ from 'lodash';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import ActiveTradersMetric from './active-traders-metric';
import TradeCountMetric from './trade-count-metric';
import TradeVolumeMetric from './trade-volume-metric';
import useRelayerStats from '../../stats/hooks/use-relayer-stats';
import useTraderStats from '../../stats/hooks/use-trader-stats';
import ZRXPriceMetric from './zrx-price-metric';

// Carousel gets loaded lazily because it relies on react-slick
const AsyncDashboardMetricsCarousel = React.lazy(() =>
  import('./dashboard-metrics-carousel'),
);

const DashboardMetrics = ({ className }) => {
  const [relayerStats] = useRelayerStats();
  const [traderStats] = useTraderStats();
  const breakpoint = useCurrentBreakpoint();

  const tradeCount = _.get(relayerStats, 'trades');
  const traderCount = _.get(traderStats, 'traderCount');
  const tradeVolume = _.get(relayerStats, 'tradeVolume');

  return breakpoint.greaterThan('md') ? (
    <Row className={className}>
      <Col lg={3} md={6}>
        <TradeVolumeMetric volume={tradeVolume} />
      </Col>
      <Col lg={3} md={6}>
        <TradeCountMetric tradeCount={tradeCount} />
      </Col>
      <Col lg={3} md={6}>
        <ActiveTradersMetric traderCount={traderCount} />
      </Col>
      <Col lg={3} md={6}>
        <ZRXPriceMetric />
      </Col>
    </Row>
  ) : (
    <AsyncDashboardMetricsCarousel
      className={className}
      tradeCount={tradeCount}
      traderCount={traderCount}
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
