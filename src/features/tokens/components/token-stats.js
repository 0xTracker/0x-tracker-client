import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import PriceRangeWidget from './price-range-widget';
import TokenStatsCarousel from './token-stats-carousel';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';
import PriceWidget from './price-widget';

const TokenStats = ({ period, token }) => {
  const breakpoint = useCurrentBreakpoint();

  if (breakpoint.greaterThan('md')) {
    return (
      <CardGridRow minHeight="90px">
        <CardGridCol lg={3} md={6}>
          <TradeVolumeWidget
            period={period}
            showPeriod={false}
            volume={token.stats.tradeVolume.USD}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <TradeCountWidget
            period={period}
            showPeriod={false}
            tradeCount={token.stats.tradeCount}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <PriceWidget price={token.price} />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <PriceRangeWidget price={token.price} />
        </CardGridCol>
      </CardGridRow>
    );
  }

  return <TokenStatsCarousel token={token} />;
};

TokenStats.propTypes = {
  period: PropTypes.string.isRequired,
  token: PropTypes.shape({
    price: PropTypes.shape({
      high: PropTypes.number,
      last: PropTypes.number,
      low: PropTypes.number,
    }).isRequired,
    stats: PropTypes.shape({
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.shape({
        USD: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default TokenStats;
