import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import { getPeriodDescriptor } from '../../../util';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import AppStatsCarousel from './app-stats-carousel';
import appsPropTypes from '../prop-types';
import AverageTradeSizeWidget from '../../fills/components/average-trade-size-widget';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';

const AppStats = ({ app, period }) => {
  const breakpoint = useCurrentBreakpoint();

  if (breakpoint.greaterThan('md')) {
    return (
      <CardGridRow minHeight="90px">
        <CardGridCol lg={3} md={6}>
          <TradeVolumeWidget
            change={app.stats.tradeVolumeChange.total}
            period={period}
            showPeriod={false}
            tooltip={`Total value of all 0x-based trades made through ${
              app.name
            } ${getPeriodDescriptor(period)}.`}
            volume={app.stats.tradeVolume.total}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <TradeCountWidget
            change={app.stats.tradeCountChange.total}
            period={period}
            showPeriod={false}
            tooltip={`Total number of 0x-based trades made through ${
              app.name
            } ${getPeriodDescriptor(period)}`}
            tradeCount={app.stats.tradeCount.total}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <ActiveTradersWidget
            change={app.stats.activeTradersChange}
            period={period}
            showPeriod={false}
            tooltip={`Number of unique traders involved in 0x-based trades on ${
              app.name
            } ${getPeriodDescriptor(period)}.`}
            traderCount={app.stats.activeTraders}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <AverageTradeSizeWidget
            avgSize={app.stats.avgTradeSize}
            change={app.stats.avgTradeSizeChange}
            period={period}
            showPeriod={false}
            tooltip={`Average size of 0x-based trades on ${
              app.name
            } ${getPeriodDescriptor(period)}.`}
          />
        </CardGridCol>
      </CardGridRow>
    );
  }

  return <AppStatsCarousel app={app} period={period} />;
};

AppStats.propTypes = {
  app: appsPropTypes.appWithStats.isRequired,
  period: PropTypes.string.isRequired,
};

export default AppStats;
