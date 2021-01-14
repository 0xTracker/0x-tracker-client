import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { truncateAddress } from '../../../util';
import formatTokenSymbol from '../util/format-token-symbol';
import LocalisedAmount from '../../currencies/components/localised-amount';
// import MiniTokenMetrics from '../../metrics/components/mini-token-metrics';
import Number from '../../../components/number';
import PercentageChange from '../../../components/percentage-change';
import Rank from '../../../components/rank';
import TokenImage from './token-image';
import TokenLink from './token-link';
import TokenListItemVolume from './token-list-item-volume';
import TokenMarketCapTooltip from './token-market-cap-tooltip';
import TokenPriceTooltip from './token-price-tooltip';
import TokenTypeBadge from './token-type-badge';
import Tooltip from '../../../components/tooltip';
import tokenPropTypes from '../prop-types';

const TokenListItem = ({ position, statsPeriod, token }) => (
  <tr>
    <td className="align-middle text-center">
      <Rank>{position}</Rank>
    </td>
    <td className="align-middle">
      <TokenLink address={token.address}>
        <TokenImage imageUrl={token.imageUrl} />
      </TokenLink>
    </td>
    <td className="align-middle" width="99%">
      <span css="display: block; line-height: 1;">
        <TokenLink address={token.address} params={{ statsPeriod }}>
          {_.truncate(token.name, { length: 30 }) || 'Unknown Token'}
        </TokenLink>
        <TokenTypeBadge>{token.type}</TokenTypeBadge>
      </span>
      <span
        css={`
          color: ${COLORS.NEUTRAL.MYSTIC_800};
          font-size: 14px;
        `}
      >
        {formatTokenSymbol(token.symbol) || truncateAddress(token.address)}
      </span>
    </td>
    <td className="align-middle" css="text-align: right;">
      {!_.isNil(token.price.close) ? (
        <Tooltip
          content={
            <TokenPriceTooltip period={statsPeriod} price={token.price} />
          }
        >
          <span>
            <LocalisedAmount
              amount={token.price.close}
              preferredPrecision={token.price.close >= 1 ? 2 : 4}
            />
            {_.isNumber(token.price.change) && (
              <PercentageChange css="display: block; font-size: 14px;">
                {token.price.change}
              </PercentageChange>
            )}
          </span>
        </Tooltip>
      ) : (
        '-'
      )}
    </td>
    <td className="align-middle" css="text-align: right;">
      {token.marketCap === null ? (
        '-'
      ) : (
        <Tooltip content={<TokenMarketCapTooltip token={token} />}>
          <span>
            <LocalisedAmount amount={token.marketCap} summarize />
          </span>
        </Tooltip>
      )}
    </td>
    <td className="align-middle" css="text-align: right;">
      <Number summarize>{token.stats.tradeCount}</Number>
      {_.isNumber(token.stats.tradeCountChange) && (
        <PercentageChange css="display: block; font-size: 14px;">
          {token.stats.tradeCountChange}
        </PercentageChange>
      )}
    </td>
    <td className="align-middle" css="text-align: right;">
      <TokenListItemVolume statsPeriod={statsPeriod} token={token} />
    </td>
    {/* <td>
      <MiniTokenMetrics
        height={40}
        period={statsPeriod}
        tokenAddress={token.address}
        width={120}
      />
    </td> */}
  </tr>
);

TokenListItem.propTypes = {
  position: PropTypes.number.isRequired,
  statsPeriod: PropTypes.string.isRequired,
  token: tokenPropTypes.tokenWithStats.isRequired,
};

export default TokenListItem;
