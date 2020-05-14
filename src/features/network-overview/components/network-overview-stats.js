import _ from 'lodash';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import NetworkOverviewStatsCarousel from './network-overview-stats-carousel';
import ProtocolFeesWidget from '../../stats/components/protocol-fees-widget';
import sharedPropTypes from '../../../prop-types';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';
import useNetworkStats from '../../stats/hooks/use-network-stats';
import useTraderStats from '../../stats/hooks/use-trader-stats';

const NetworkOverviewStats = ({ period }) => {
  const [networkStats] = useNetworkStats({ period });
  const [traderStats] = useTraderStats({ period });
  const breakpoint = useCurrentBreakpoint();

  const tradeCount = _.get(networkStats, 'tradeCount');
  const traderCount = _.get(traderStats, 'traderCount');
  const tradeVolume = _.get(networkStats, 'tradeVolume');
  const protocolFees = _.get(networkStats, 'protocolFees.USD');

  if (breakpoint.greaterThan('md')) {
    return (
      <CardGridRow minHeight="80px">
        <CardGridCol lg={3} md={6}>
          <TradeVolumeWidget
            period={period}
            showPeriod={false}
            volume={tradeVolume}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <TradeCountWidget
            period={period}
            showPeriod={false}
            tradeCount={tradeCount}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <ActiveTradersWidget
            period={period}
            showPeriod={false}
            traderCount={traderCount}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <ProtocolFeesWidget
            accumulatedFees={protocolFees}
            period={period}
            showPeriod={false}
          />
        </CardGridCol>
      </CardGridRow>
    );
  }

  return (
    <NetworkOverviewStatsCarousel
      protocolFees={protocolFees}
      tradeCount={tradeCount}
      traderCount={traderCount}
      tradeVolume={tradeVolume}
    />
  );
};

NetworkOverviewStats.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
};

export default NetworkOverviewStats;
