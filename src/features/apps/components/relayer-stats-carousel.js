import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import '../../../styles/css/slick-carousel.css';

import { BREAKPOINTS } from '../../../styles/constants';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import TradedTokensWidget from '../../tokens/components/traded-tokens-widget';

const CarouselStat = styled.div`
  margin: 0 0.5rem;
  min-height: 6rem;
`;

const RelayerStatsCarousel = ({ period, relayer }) => (
  <Slider
    arrows={false}
    centerMode
    centerPadding="20px"
    css="margin-bottom: 1.25rem;"
    infinite
    responsive={[
      {
        breakpoint: BREAKPOINTS.sm,
        settings: { slidesToScroll: 1, slidesToShow: 1 },
      },
      {
        breakpoint: BREAKPOINTS.md,
        settings: { slidesToScroll: 2, slidesToShow: 2 },
      },
    ]}
    slidesToScroll={3}
    slidesToShow={3}
  >
    <CarouselStat
      as={TradeVolumeWidget}
      change={relayer.stats.tradeVolumeChange}
      period={period}
      showPeriod={false}
      volume={relayer.stats.tradeVolume}
    />
    <CarouselStat
      as={TradeCountWidget}
      change={relayer.stats.tradeCountChange}
      period={period}
      showPeriod={false}
      tradeCount={relayer.stats.tradeCount}
    />
    <CarouselStat
      as={ActiveTradersWidget}
      change={relayer.stats.activeTradersChange}
      period={period}
      showPeriod={false}
      traderCount={relayer.stats.activeTraders}
    />
    <CarouselStat
      as={TradedTokensWidget}
      change={relayer.stats.tradedTokensChange}
      period={period}
      showPeriod={false}
      tradedTokens={relayer.stats.tradedTokens}
    />
  </Slider>
);

RelayerStatsCarousel.propTypes = {
  period: PropTypes.string.isRequired,
  relayer: PropTypes.shape({
    stats: PropTypes.shape({
      activeTraders: PropTypes.number.isRequired,
      activeTradersChange: PropTypes.number.isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeCountChange: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
      tradeVolumeChange: PropTypes.number.isRequired,
      tradedTokens: PropTypes.number.isRequired,
      tradedTokensChange: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RelayerStatsCarousel;
