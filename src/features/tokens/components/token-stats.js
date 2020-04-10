import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import MarketCapWidget from './market-cap-widget';
import PriceRangeWidget from './price-range-widget';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';

// Carousel gets loaded lazily because it relies on react-slick
const AsyncTokenStatsCarousel = React.lazy(() =>
  import('./token-stats-carousel'),
);

const TokenStats = ({ className, period, token }) => {
  const breakpoint = useCurrentBreakpoint();

  return breakpoint.greaterThan('md') ? (
    <Row className={className}>
      <Col lg={3} md={6}>
        <TradeVolumeWidget
          css="min-height: 6rem;"
          period={period}
          volume={token.stats.tradeVolume.USD}
        />
      </Col>
      <Col lg={3} md={6}>
        <TradeCountWidget
          css="min-height: 6rem;"
          period={period}
          tradeCount={token.stats.tradeCount}
        />
      </Col>
      <Col lg={3} md={6}>
        <MarketCapWidget
          circulatingSupply={20000000}
          css="min-height: 6rem;"
          marketCap={48000000}
          price={token.price}
        />
      </Col>
      <Col lg={3} md={6}>
        <PriceRangeWidget css="min-height: 6rem;" price={token.price} />
      </Col>
    </Row>
  ) : (
    <AsyncTokenStatsCarousel className={className} token={token} />
  );
};

TokenStats.propTypes = {
  className: PropTypes.string,
  period: PropTypes.string.isRequired,
  token: PropTypes.shape({
    price: PropTypes.shape({
      high: PropTypes.number,
      last: PropTypes.number,
      low: PropTypes.number,
    }).isRequired,
    stats: PropTypes.shape({
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.shape({
        USD: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

TokenStats.defaultProps = {
  className: undefined,
};

export default TokenStats;
