import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import '../../../styles/css/slick-carousel.css';

import { BREAKPOINTS } from '../../../styles/constants';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import ProtocolFeesWidget from '../../stats/components/protocol-fees-widget';
import TradeCountWidget from './trade-count-widget';
import TradeVolumeWidget from './trade-volume-widget';

const CarouselStat = styled.div`
  margin: 0 0.5rem;
`;

const FillsBrowserStatsCarousel = ({
  protocolFees,
  protocolFeesChange,
  tradeCount,
  tradeCountChange,
  traderCount,
  traderCountChange,
  tradeVolume,
  tradeVolumeChange,
}) => (
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
      change={tradeVolumeChange}
      volume={tradeVolume}
    />
    <CarouselStat
      as={TradeCountWidget}
      change={tradeCountChange}
      tradeCount={tradeCount}
    />
    <CarouselStat
      as={ActiveTradersWidget}
      change={traderCountChange}
      traderCount={traderCount}
    />
    <CarouselStat
      accumulatedFees={protocolFees}
      as={ProtocolFeesWidget}
      change={protocolFeesChange}
    />
  </Slider>
);

FillsBrowserStatsCarousel.propTypes = {
  protocolFees: PropTypes.number,
  protocolFeesChange: PropTypes.number,
  tradeCount: PropTypes.number,
  tradeCountChange: PropTypes.number,
  tradeVolume: PropTypes.number,
  tradeVolumeChange: PropTypes.number,
  traderCount: PropTypes.number,
  traderCountChange: PropTypes.number,
};

FillsBrowserStatsCarousel.defaultProps = {
  protocolFees: undefined,
  protocolFeesChange: undefined,
  tradeCount: undefined,
  tradeCountChange: undefined,
  tradeVolume: undefined,
  tradeVolumeChange: undefined,
  traderCount: undefined,
  traderCountChange: undefined,
};

export default FillsBrowserStatsCarousel;
