import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import '../../../styles/css/slick-carousel.css';

import { breakpoints } from '../../../styles/constants';
import NetworkFeesMetric from './network-fees-metric';
import NetworkVolumeMetric from './network-volume-metric';
import TradeCountMetric from './trade-count-metric';
import ZRXPriceMetric from './zrx-price-metric';

const CarouselMetric = styled.div`
  margin: 0 0.5rem;
`;

const DashboardMetricsCarousel = ({ className, fees, tradeCount, volume }) => (
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
    <CarouselMetric as={NetworkVolumeMetric} volume={volume} />
    <CarouselMetric as={NetworkFeesMetric} fees={fees} />
    <CarouselMetric as={TradeCountMetric} tradeCount={tradeCount} />
    <CarouselMetric as={ZRXPriceMetric} />
  </Slider>
);

DashboardMetricsCarousel.propTypes = {
  className: PropTypes.string,
  fees: PropTypes.number,
  tradeCount: PropTypes.number,
  volume: PropTypes.number,
};

DashboardMetricsCarousel.defaultProps = {
  className: undefined,
  fees: undefined,
  tradeCount: undefined,
  volume: undefined,
};

export default DashboardMetricsCarousel;
