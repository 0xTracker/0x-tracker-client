import _ from 'lodash';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import { TIME_PERIOD } from '../../../constants';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import HomePageMetricsCarousel from './home-page-metrics-carousel';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';
import useNetworkStats from '../../stats/hooks/use-network-stats';
import useTraderStats from '../../stats/hooks/use-trader-stats';
import ZRXPriceWidget from './zrx-price-widget';

const statsParams = { period: TIME_PERIOD.DAY };

const HomePageMetrics = () => {
  const [networkStats, loadingNetworkStats] = useNetworkStats(statsParams);
  const [traderStats, loadingTraderStats] = useTraderStats(statsParams);
  const breakpoint = useCurrentBreakpoint();

  const tradeCount = _.get(networkStats, 'tradeCount');
  const tradeCountChange = _.get(networkStats, 'tradeCountChange');
  const traderCount = _.get(traderStats, 'traderCount');
  const traderCountChange = _.get(traderStats, 'traderCountChange');
  const tradeVolume = _.get(networkStats, 'tradeVolume');
  const tradeVolumeChange = _.get(networkStats, 'tradeVolumeChange');

  return breakpoint.greaterThan('md') ? (
    <CardGridRow minHeight="80px">
      <CardGridCol lg={3} md={6}>
        <TradeVolumeWidget
          change={tradeVolumeChange}
          loading={loadingNetworkStats}
          period={statsParams.period}
          volume={tradeVolume}
        />
      </CardGridCol>
      <CardGridCol lg={3} md={6}>
        <TradeCountWidget
          change={tradeCountChange}
          loading={loadingNetworkStats}
          period={statsParams.period}
          tradeCount={tradeCount}
        />
      </CardGridCol>
      <CardGridCol lg={3} md={6}>
        <ActiveTradersWidget
          change={traderCountChange}
          loading={loadingTraderStats}
          period={statsParams.period}
          traderCount={traderCount}
        />
      </CardGridCol>
      <CardGridCol lg={3} md={6}>
        <ZRXPriceWidget />
      </CardGridCol>
    </CardGridRow>
  ) : (
    <HomePageMetricsCarousel
      period={statsParams.period}
      tradeCount={tradeCount}
      tradeCountChange={tradeCountChange}
      traderCount={traderCount}
      traderCountChange={traderCountChange}
      tradeVolume={tradeVolume}
      tradeVolumeChange={tradeVolumeChange}
    />
  );
};

export default HomePageMetrics;
