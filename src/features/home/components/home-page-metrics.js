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
  const traderCount = _.get(traderStats, 'traderCount');
  const tradeVolume = _.get(networkStats, 'tradeVolume');

  return breakpoint.greaterThan('md') ? (
    <CardGridRow minHeight="80px">
      <CardGridCol lg={3} md={6}>
        <TradeVolumeWidget
          loading={loadingNetworkStats}
          period={statsParams.period}
          volume={tradeVolume}
        />
      </CardGridCol>
      <CardGridCol lg={3} md={6}>
        <TradeCountWidget
          loading={loadingNetworkStats}
          period={statsParams.period}
          tradeCount={tradeCount}
        />
      </CardGridCol>
      <CardGridCol lg={3} md={6}>
        <ActiveTradersWidget
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
      traderCount={traderCount}
      tradeVolume={tradeVolume}
    />
  );
};

export default HomePageMetrics;
