import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { DATE_FORMAT } from '../../../constants';
import { colors } from '../../../styles/constants';
import FillLink from '../../fills/components/fill-link';
import formatDate from '../../../util/format-date';
import formatTokenSymbol from '../util/format-token-symbol';
import LocalisedAmount from '../../currencies/components/localised-amount';
import MiniTokenMetrics from '../../metrics/components/mini-token-metrics';
import Number from '../../../components/number';
import TokenImage from './token-image';
import TokenLink from './token-link';
import TokenListItemVolume from './token-list-item-volume';

const LastTradeLink = styled(FillLink)`
  color: inherit;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

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
        <LastTradeLink fillId={token.lastTrade.id}>
          <LocalisedAmount amount={token.price.last} />
          <br />
          <span
            css={`
              font-size: 0.8rem;
              color: ${colors.stormGray};
            `}
          >
            {formatDate(token.lastTrade.date, DATE_FORMAT.RELATIVE)}
          </span>
        </LastTradeLink>
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
