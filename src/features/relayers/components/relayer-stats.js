import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import { getPeriodDescriptor } from '../../../util';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import TokenStatsCarousel from './relayer-stats-carousel';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';
import TradedTokensWidget from '../../tokens/components/traded-tokens-widget';

const RelayerStats = ({ period, relayer }) => {
  const breakpoint = useCurrentBreakpoint();

  if (breakpoint.greaterThan('md')) {
    return (
      <CardGridRow minHeight="90px">
        <CardGridCol lg={3} md={6}>
          <TradeVolumeWidget
            change={relayer.stats.tradeVolumeChange}
            period={period}
            showPeriod={false}
            tooltip={`Total value of all trades relayed by ${
              relayer.name
            } ${getPeriodDescriptor(period)}.`}
            volume={relayer.stats.tradeVolume}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <TradeCountWidget
            change={relayer.stats.tradeCountChange}
            period={period}
            showPeriod={false}
            tooltip={`Total number of trades relayed by ${
              relayer.name
            } ${getPeriodDescriptor(period)}`}
            tradeCount={relayer.stats.tradeCount}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <ActiveTradersWidget
            change={relayer.stats.activeTradersChange}
            period={period}
            showPeriod={false}
            traderCount={relayer.stats.activeTraders}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <TradedTokensWidget
            change={relayer.stats.tradedTokensChange}
            period={period}
            showPeriod={false}
            tradedTokens={relayer.stats.tradedTokens}
          />
        </CardGridCol>
      </CardGridRow>
    );
  }

  return <TokenStatsCarousel period={period} relayer={relayer} />;
};

RelayerStats.propTypes = {
  period: PropTypes.string.isRequired,
  relayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      activeTraders: PropTypes.number.isRequired,
      activeTradersChange: PropTypes.number.isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeCountChange: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
      tradeVolumeChange: PropTypes.number.isRequired,
      tradedTokens: PropTypes.number.isRequired,
      tradedTokensChange: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RelayerStats;
