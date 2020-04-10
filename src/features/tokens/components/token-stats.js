import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import MarketCapWidget from './market-cap-widget';
import PriceRangeWidget from './price-range-widget';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';

// Carousel gets loaded lazily because it relies on react-slick
const AsyncTokenStatsCarousel = React.lazy(() =>
  import('./token-stats-carousel'),
);

const TokenStatWidget = styled.div`
  min-height: 6rem;
`;

const TokenStats = ({ period, token }) => {
  const breakpoint = useCurrentBreakpoint();

  return breakpoint.greaterThan('md') ? (
    <Row css="margin-bottom: 2rem;">
      <Col lg={3} md={6}>
        <TokenStatWidget
          as={TradeVolumeWidget}
          period={period}
          volume={token.stats.tradeVolume.USD}
        />
      </Col>
      <Col lg={3} md={6}>
        <TokenStatWidget
          as={TradeCountWidget}
          period={period}
          tradeCount={token.stats.tradeCount}
        />
      </Col>
      <Col lg={3} md={6}>
        <TokenStatWidget
          as={MarketCapWidget}
          circulatingSupply={20000000}
          marketCap={48000000}
          price={token.price}
        />
      </Col>
      <Col lg={3} md={6}>
        <TokenStatWidget as={PriceRangeWidget} price={token.price} />
      </Col>
    </Row>
  ) : (
    <AsyncTokenStatsCarousel token={token} />
  );
};

TokenStats.propTypes = {
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

export default TokenStats;
