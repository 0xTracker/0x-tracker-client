import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import formatTokenSymbol from '../util/format-token-symbol';
import LocalisedAmount from '../../currencies/components/localised-amount';
import MiniTokenMetrics from '../../metrics/components/mini-token-metrics';
import Number from '../../../components/number';
import PriceChange from '../../../components/price-change';
import TokenImage from './token-image';
import TokenLink from './token-link';
import TokenListItemVolume from './token-list-item-volume';
import TokenMarketCapTooltip from './token-market-cap-tooltip';
import TokenPriceTooltip from './token-price-tooltip';
import TokenTypeBadge from './token-type-badge';
import Tooltip from '../../../components/tooltip';

const truncateAddress = (address) =>
  `${address.slice(0, 15)}...${address.slice(address.length - 15)}`;

const TokenListItem = ({ position, statsPeriod, token }) => (
  <tr>
    <td className="align-middle">{position}</td>
    <td className="align-middle">
      <TokenLink address={token.address}>
        <TokenImage imageUrl={token.imageUrl} />
      </TokenLink>
    </td>
    <td className="align-middle" width="99%">
      <span css="display: block; line-height: 1;">
        <TokenLink
          address={token.address}
          css="font-weight: 500;"
          params={{ statsPeriod }}
        >
          {_.truncate(token.name, { length: 30 }) || 'Unknown Token'}
        </TokenLink>
        <TokenTypeBadge>{token.type}</TokenTypeBadge>
      </span>
      <span
        css={`
          color: ${COLORS.NEUTRAL.MYSTIC_700};
          font-size: 0.9rem;
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
            {token.price.change === null ? null : (
              <>
                <br />
                <PriceChange>{token.price.change}</PriceChange>
              </>
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
    </td>
    <td className="align-middle" css="text-align: right;">
      <TokenListItemVolume token={token} />
    </td>
    <td>
      <MiniTokenMetrics
        height={40}
        period={statsPeriod}
        tokenAddress={token.address}
        width={120}
      />
    </td>
  </tr>
);

TokenListItem.propTypes = {
  position: PropTypes.number.isRequired,
  statsPeriod: PropTypes.string.isRequired,
  token: PropTypes.object.isRequired,
};

export default TokenListItem;
