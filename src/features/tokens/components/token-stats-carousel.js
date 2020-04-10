import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import '../../../styles/css/slick-carousel.css';

import { breakpoints } from '../../../styles/constants';
import MarketCapWidget from './market-cap-widget';
import PriceRangeWidget from './price-range-widget';
import TokenPriceWidget from './token-price-widget';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';

const CarouselStat = styled.div`
  margin: 0 0.5rem;
  min-height: 6rem;
`;

const TokenStatsCarousel = ({ period, token }) => (
  <Slider
    arrows={false}
    centerMode
    centerPadding="20px"
    css="margin-bottom: 1.25rem;"
    infinite
    responsive={[
      {
        breakpoint: breakpoints.sm,
        settings: { slidesToScroll: 1, slidesToShow: 1 },
      },
      {
        breakpoint: breakpoints.md,
        settings: { slidesToScroll: 2, slidesToShow: 2 },
      },
    ]}
    slidesToScroll={3}
    slidesToShow={3}
  >
    <CarouselStat as={TokenPriceWidget} price={token.price} />
    <CarouselStat
      as={TradeVolumeWidget}
      period={period}
      volume={token.stats.tradeVolume.USD}
    />
    <CarouselStat
      as={TradeCountWidget}
      period={period}
      tradeCount={token.stats.tradeCount}
    />
    <CarouselStat
      as={MarketCapWidget}
      circulatingSupply={20000000}
      marketCap={48000000}
      price={token.price}
    />
    <CarouselStat as={PriceRangeWidget} price={token.price} />
  </Slider>
);

TokenStatsCarousel.propTypes = {
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

export default TokenStatsCarousel;
