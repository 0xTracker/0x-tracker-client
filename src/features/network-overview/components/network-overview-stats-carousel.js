import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import '../../../styles/css/slick-carousel.css';

import { BREAKPOINTS } from '../../../styles/constants';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import ProtocolFeesWidget from '../../stats/components/protocol-fees-widget';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';

const CarouselStat = styled.div`
  margin: 0 0.5rem;
`;

const NetworkOverviewStatsCarousel = ({
  protocolFees,
  tradeCount,
  traderCount,
  tradeVolume,
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
    <CarouselStat as={TradeVolumeWidget} volume={tradeVolume} />
    <CarouselStat as={TradeCountWidget} tradeCount={tradeCount} />
    <CarouselStat as={ActiveTradersWidget} traderCount={traderCount} />
    <CarouselStat accumulatedFees={protocolFees} as={ProtocolFeesWidget} />
  </Slider>
);

NetworkOverviewStatsCarousel.propTypes = {
  protocolFees: PropTypes.number,
  tradeCount: PropTypes.number,
  tradeVolume: PropTypes.number,
  traderCount: PropTypes.number,
};

NetworkOverviewStatsCarousel.defaultProps = {
  protocolFees: undefined,
  tradeCount: undefined,
  tradeVolume: undefined,
  traderCount: undefined,
};

export default NetworkOverviewStatsCarousel;
