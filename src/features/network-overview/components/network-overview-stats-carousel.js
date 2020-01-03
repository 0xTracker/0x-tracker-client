import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import '../../../styles/css/slick-carousel.css';

import { breakpoints } from '../../../styles/constants';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import FillVolumeWidget from '../../fills/components/fill-volume-widget';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';

const CarouselStat = styled.div`
  margin: 0 0.5rem;
`;

const NetworkOverviewStatsCarousel = ({
  className,
  fillVolume,
  tradeCount,
  traderCount,
  tradeVolume,
}) => (
  <Slider
    arrows={false}
    centerMode
    centerPadding="20px"
    className={className}
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
    <CarouselStat as={FillVolumeWidget} fillVolume={fillVolume} />
    <CarouselStat as={TradeVolumeWidget} volume={tradeVolume} />
    <CarouselStat as={TradeCountWidget} tradeCount={tradeCount} />
    <CarouselStat as={ActiveTradersWidget} traderCount={traderCount} />
  </Slider>
);

NetworkOverviewStatsCarousel.propTypes = {
  className: PropTypes.string,
  fillVolume: PropTypes.number,
  tradeCount: PropTypes.number,
  tradeVolume: PropTypes.number,
  traderCount: PropTypes.number,
};

NetworkOverviewStatsCarousel.defaultProps = {
  className: undefined,
  fillVolume: undefined,
  tradeCount: undefined,
  tradeVolume: undefined,
  traderCount: undefined,
};

export default NetworkOverviewStatsCarousel;
