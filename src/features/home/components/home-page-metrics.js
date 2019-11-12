import _ from 'lodash';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';
import useNetworkStats from '../../stats/hooks/use-network-stats';
import useTraderStats from '../../stats/hooks/use-trader-stats';
import ZRXPriceWidget from './zrx-price-widget';

// Carousel gets loaded lazily because it relies on react-slick
const AsyncHomePageMetricsCarousel = React.lazy(() =>
  import('./home-page-metrics-carousel'),
);

const HomePageMetrics = ({ className }) => {
  const [networkStats] = useNetworkStats();
  const [traderStats] = useTraderStats();
  const breakpoint = useCurrentBreakpoint();

  const tradeCount = _.get(networkStats, 'tradeCount');
  const traderCount = _.get(traderStats, 'traderCount');
  const tradeVolume = _.get(networkStats, 'tradeVolume');

  return breakpoint.greaterThan('md') ? (
    <Row className={className}>
      <Col lg={3} md={6}>
        <TradeVolumeWidget volume={tradeVolume} />
      </Col>
      <Col lg={3} md={6}>
        <TradeCountWidget tradeCount={tradeCount} />
      </Col>
      <Col lg={3} md={6}>
        <ActiveTradersWidget traderCount={traderCount} />
      </Col>
      <Col lg={3} md={6}>
        <ZRXPriceWidget />
      </Col>
    </Row>
  ) : (
    <AsyncHomePageMetricsCarousel
      className={className}
      tradeCount={tradeCount}
      traderCount={traderCount}
      tradeVolume={tradeVolume}
    />
  );
};

HomePageMetrics.propTypes = {
  className: PropTypes.string,
};

HomePageMetrics.defaultProps = {
  className: undefined,
};

export default HomePageMetrics;
