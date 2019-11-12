import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import '../../../styles/css/slick-carousel.css';

import { breakpoints } from '../../../styles/constants';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';
import ZRXPriceMetric from './zrx-price-widget';

const CarouselMetric = styled.div`
  margin: 0 0.5rem;
`;

const HomePageMetricsCarousel = ({
  className,
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
    <CarouselMetric as={TradeVolumeWidget} volume={tradeVolume} />
    <CarouselMetric as={TradeCountWidget} tradeCount={tradeCount} />
    <CarouselMetric as={ActiveTradersWidget} traderCount={traderCount} />
    <CarouselMetric as={ZRXPriceMetric} />
  </Slider>
);

HomePageMetricsCarousel.propTypes = {
  className: PropTypes.string,
  tradeCount: PropTypes.number,
  tradeVolume: PropTypes.number,
  traderCount: PropTypes.number,
};

HomePageMetricsCarousel.defaultProps = {
  className: undefined,
  tradeCount: undefined,
  tradeVolume: undefined,
  traderCount: undefined,
};

export default HomePageMetricsCarousel;
