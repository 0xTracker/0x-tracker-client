import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import '../../../styles/css/slick-carousel.css';

import { breakpoints } from '../../../styles/constants';
import ActiveTradersMetric from './active-traders-metric';
import TradeCountMetric from './trade-count-metric';
import TradeVolumeMetric from './trade-volume-metric';
import ZRXPriceMetric from './zrx-price-metric';

const CarouselMetric = styled.div`
  margin: 0 0.5rem;
`;

const DashboardMetricsCarousel = ({
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
    <CarouselMetric as={TradeVolumeMetric} volume={tradeVolume} />
    <CarouselMetric as={TradeCountMetric} tradeCount={tradeCount} />
    <CarouselMetric as={ActiveTradersMetric} traderCount={traderCount} />
    <CarouselMetric as={ZRXPriceMetric} />
  </Slider>
);

DashboardMetricsCarousel.propTypes = {
  className: PropTypes.string,
  tradeCount: PropTypes.number,
  tradeVolume: PropTypes.number,
  traderCount: PropTypes.number,
};

DashboardMetricsCarousel.defaultProps = {
  className: undefined,
  tradeCount: undefined,
  tradeVolume: undefined,
  traderCount: undefined,
};

export default DashboardMetricsCarousel;
