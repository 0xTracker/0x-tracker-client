import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import '../../../styles/css/slick-carousel.css';

import { BREAKPOINTS } from '../../../styles/constants';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import appsPropTypes from '../prop-types';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';

const CarouselStat = styled.div`
  margin: 0 0.5rem;
  min-height: 6rem;
`;

const AppStatsCarousel = ({ app, period }) => (
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
      change={app.stats.tradeVolumeChange.total}
      period={period}
      showPeriod={false}
      volume={app.stats.tradeVolume.total}
    />
    <CarouselStat
      as={TradeCountWidget}
      change={app.stats.tradeCountChange.total}
      period={period}
      showPeriod={false}
      tradeCount={app.stats.tradeCount.total}
    />
    <CarouselStat
      as={ActiveTradersWidget}
      change={app.stats.activeTradersChange}
      period={period}
      showPeriod={false}
      traderCount={app.stats.activeTraders}
    />
  </Slider>
);

AppStatsCarousel.propTypes = {
  app: appsPropTypes.appWithStats.isRequired,
  period: PropTypes.string.isRequired,
};

export default AppStatsCarousel;
