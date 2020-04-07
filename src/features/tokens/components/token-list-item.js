import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import formatTokenSymbol from '../util/format-token-symbol';
import LocalisedAmount from '../../currencies/components/localised-amount';
import MiniTokenMetrics from '../../metrics/components/mini-token-metrics';
import Number from '../../../components/number';
import PriceChange from '../../../components/price-change';
import TokenImage from './token-image';
import TokenLink from './token-link';
import TokenListItemVolume from './token-list-item-volume';

const truncateAddress = (address) =>
  `${address.slice(0, 15)}...${address.slice(address.length - 15)}`;

const getTypeBadgeColor = (type) => {
  if (type === 'ERC-721') {
    return { bg: colors.violet, text: colors.white };
  }

  if (type === 'ERC-1155') {
    return { bg: colors.indigo, text: colors.white };
  }

  return { bg: colors.mischka, text: colors.martinique };
};

// TODO: Encapsulate this in a reusable component and use on fill page
const AssetTypeBadge = styled.span.attrs(() => ({
  className: 'badge',
}))`
  background-color: ${(props) => getTypeBadgeColor(props.children).bg};
  color: ${(props) => getTypeBadgeColor(props.children).text};
  margin-left: 0.75rem;
`;

const TokenListItem = ({ position, statsPeriod, token }) => (
  <tr>
    <td className="align-middle">{position}</td>
    <td className="align-middle">
      <TokenLink address={token.address}>
        <TokenImage imageUrl={token.imageUrl} />
      </TokenLink>
    </td>
    <td width="99%">
      <TokenLink address={token.address}>
        {_.truncate(token.name, { length: 30 }) || 'Unknown Token'}
      </TokenLink>
      <AssetTypeBadge>{token.type.toUpperCase()}</AssetTypeBadge>
      <br />
      {formatTokenSymbol(token.symbol) || truncateAddress(token.address)}
    </td>
    <td className="align-middle" css="text-align: right;">
      {!_.isNil(token.price.last) && token.type === 'erc-20' ? (
        <>
          <LocalisedAmount amount={token.price.last} />
          {token.price.change === null ? null : (
            <>
              <br />
              <PriceChange>{token.price.change}</PriceChange>
            </>
          )}
        </>
      ) : (
        '-'
      )}
    </td>
    <td className="align-middle" css="text-align: right;">
      <Number>{token.stats.tradeCount}</Number>
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
