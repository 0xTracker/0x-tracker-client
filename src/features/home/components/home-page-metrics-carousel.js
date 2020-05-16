import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import '../../../styles/css/slick-carousel.css';

import { BREAKPOINTS } from '../../../styles/constants';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import sharedPropTypes from '../../../prop-types';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';
import ZRXPriceMetric from './zrx-price-widget';

const CarouselMetric = styled.div`
  margin: 0 0.5rem;
`;

const HomePageMetricsCarousel = ({
  period,
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
    <CarouselMetric
      as={TradeVolumeWidget}
      change={tradeVolumeChange}
      period={period}
      volume={tradeVolume}
    />
    <CarouselMetric
      as={TradeCountWidget}
      change={tradeCountChange}
      period={period}
      tradeCount={tradeCount}
    />
    <CarouselMetric
      as={ActiveTradersWidget}
      change={traderCountChange}
      period={period}
      traderCount={traderCount}
    />
    <CarouselMetric as={ZRXPriceMetric} />
  </Slider>
);

HomePageMetricsCarousel.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
  tradeCount: PropTypes.number,
  tradeCountChange: PropTypes.number,
  tradeVolume: PropTypes.number,
  tradeVolumeChange: PropTypes.number,
  traderCount: PropTypes.number,
  traderCountChange: PropTypes.number,
};

HomePageMetricsCarousel.defaultProps = {
  tradeCount: undefined,
  tradeCountChange: undefined,
  tradeVolume: undefined,
  tradeVolumeChange: undefined,
  traderCount: undefined,
  traderCountChange: undefined,
};

export default HomePageMetricsCarousel;
