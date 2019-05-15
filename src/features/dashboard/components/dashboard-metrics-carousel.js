import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import '../../../styles/css/slick-carousel.css';

import { breakpoints } from '../../../styles/constants';
import FillCountMetric from './fill-count-metric';
import FillVolumeMetric from './fill-volume-metric';
import TradeVolumeMetric from './trade-volume-metric';
import ZRXPriceMetric from './zrx-price-metric';

const CarouselMetric = styled.div`
  margin: 0 0.5rem;
`;

const DashboardMetricsCarousel = ({
  className,
  fillCount,
  fillVolume,
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
    <CarouselMetric as={FillVolumeMetric} volume={fillVolume} />
    <CarouselMetric as={TradeVolumeMetric} volume={tradeVolume} />
    <CarouselMetric as={FillCountMetric} fillCount={fillCount} />
    <CarouselMetric as={ZRXPriceMetric} />
  </Slider>
);

DashboardMetricsCarousel.propTypes = {
  className: PropTypes.string,
  fillCount: PropTypes.number,
  fillVolume: PropTypes.number,
  tradeVolume: PropTypes.number,
};

DashboardMetricsCarousel.defaultProps = {
  className: undefined,
  fillCount: undefined,
  fillVolume: undefined,
  tradeVolume: undefined,
};

export default DashboardMetricsCarousel;
