import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import FillsBrowserStatsCarousel from './fills-browser-stats-carousel';
import ProtocolFeesWidget from '../../stats/components/protocol-fees-widget';
import sharedPropTypes from '../../../prop-types';
import TradeCountWidget from './trade-count-widget';
import TradeVolumeWidget from './trade-volume-widget';
import useNetworkStats from '../../stats/hooks/use-network-stats';
import useTraderStats from '../../stats/hooks/use-trader-stats';

const FillsBrowserStats = ({ filters, period }) => {
  const [networkStats] = useNetworkStats({ filters, period });
  const [traderStats] = useTraderStats({ filters, period });
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
    <FillsBrowserStatsCarousel
      protocolFees={protocolFees}
      protocolFeesChange={protocolFeesChange}
      tradeCount={tradeCount}
      tradeCountChange={tradeCountChange}
      traderCount={traderCount}
      traderCountChange={traderCountChange}
      tradeVolume={tradeVolume}
      tradeVolumeChange={tradeVolumeChange}
    />
  );
};

FillsBrowserStats.propTypes = {
  filters: PropTypes.shape({
    periodFrom: PropTypes.instanceOf(Date),
    periodTo: PropTypes.instanceOf(Date),
    protocolVersion: PropTypes.number,
    relayer: PropTypes.string,
    status: PropTypes.string,
    token: PropTypes.string,
    valueFrom: PropTypes.number,
    valueTo: PropTypes.number,
  }),
  period: sharedPropTypes.timePeriod,
};

FillsBrowserStats.defaultProps = {
  filters: undefined,
  period: undefined,
};

export default FillsBrowserStats;
