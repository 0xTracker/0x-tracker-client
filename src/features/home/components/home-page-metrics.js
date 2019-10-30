import _ from 'lodash';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import { TIME_PERIOD } from '../../../constants';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';
import useRelayerStats from '../../stats/hooks/use-relayer-stats';
import useTraderStats from '../../stats/hooks/use-trader-stats';
import ZRXPriceWidget from './zrx-price-widget';

// Carousel gets loaded lazily because it relies on react-slick
const AsyncHomePageMetricsCarousel = React.lazy(() =>
  import('./home-page-metrics-carousel'),
);

const PERIOD = TIME_PERIOD.DAY;

const HomePageMetrics = ({ className }) => {
  const [relayerStats] = useRelayerStats();
  const [traderStats] = useTraderStats();
  const breakpoint = useCurrentBreakpoint();

  const tradeCount = _.get(relayerStats, 'trades');
  const traderCount = _.get(traderStats, 'traderCount');
  const tradeVolume = _.get(relayerStats, 'tradeVolume');

  return breakpoint.greaterThan('md') ? (
    <Row className={className}>
      <Col lg={3} md={6}>
        <TradeVolumeWidget period={PERIOD} volume={tradeVolume} />
      </Col>
      <Col lg={3} md={6}>
        <TradeCountWidget period={PERIOD} tradeCount={tradeCount} />
      </Col>
      <Col lg={3} md={6}>
        <ActiveTradersWidget period={PERIOD} traderCount={traderCount} />
      </Col>
      <Col lg={3} md={6}>
        <ZRXPriceWidget />
      </Col>
    </Row>
  ) : (
    <AsyncHomePageMetricsCarousel
      className={className}
      period={PERIOD}
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
