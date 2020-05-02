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
  traderCount,
  tradeVolume,
  ...otherProps
}) => (
  <Slider
    arrows={false}
    centerMode
    centerPadding="20px"
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
    {...otherProps}
  >
    <CarouselMetric
      as={TradeVolumeWidget}
      css="min-height: 80px;"
      period={period}
      volume={tradeVolume}
    />
    <CarouselMetric
      as={TradeCountWidget}
      css="min-height: 80px;"
      period={period}
      tradeCount={tradeCount}
    />
    <CarouselMetric
      as={ActiveTradersWidget}
      css="min-height: 80px;"
      period={period}
      traderCount={traderCount}
    />
    <CarouselMetric as={ZRXPriceMetric} css="min-height: 80px;" />
  </Slider>
);

HomePageMetricsCarousel.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
  tradeCount: PropTypes.number,
  tradeVolume: PropTypes.number,
  traderCount: PropTypes.number,
};

HomePageMetricsCarousel.defaultProps = {
  tradeCount: undefined,
  tradeVolume: undefined,
  traderCount: undefined,
};

export default HomePageMetricsCarousel;
