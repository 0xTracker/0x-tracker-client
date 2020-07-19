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
  const tradeCountChange = _.get(networkStats, 'tradeCountChange');
  const traderCount = _.get(traderStats, 'traderCount');
  const traderCountChange = _.get(traderStats, 'traderCountChange');
  const tradeVolume = _.get(networkStats, 'tradeVolume');
  const tradeVolumeChange = _.get(networkStats, 'tradeVolumeChange');
  const protocolFees = _.get(networkStats, 'protocolFees.USD');
  const protocolFeesChange = _.get(networkStats, 'protocolFeesChange');

  if (breakpoint.greaterThan('md')) {
    return (
      <CardGridRow minHeight="80px">
        <CardGridCol lg={3} md={6}>
          <TradeVolumeWidget
            change={tradeVolumeChange}
            period={period}
            showPeriod={false}
            volume={tradeVolume}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <TradeCountWidget
            change={tradeCountChange}
            period={period}
            showPeriod={false}
            tradeCount={tradeCount}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <ActiveTradersWidget
            change={traderCountChange}
            period={period}
            showPeriod={false}
            traderCount={traderCount}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <ProtocolFeesWidget
            accumulatedFees={protocolFees}
            change={protocolFeesChange}
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
      protocolFeesChange={protocolFeesChange}
      tradeCount={tradeCount}
      tradeCountChange={tradeCountChange}
      tradeVolume={tradeVolume}
      tradeVolumeChange={tradeVolumeChange}
      traderCount={traderCount}
      traderCountChange={traderCountChange}
    />
  );
};

NetworkOverviewStats.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
};

export default NetworkOverviewStats;
