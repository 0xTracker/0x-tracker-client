import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { DATE_FORMAT } from '../../../constants';
import { colors } from '../../../styles/constants';
import FillLink from '../../fills/components/fill-link';
import formatDate from '../../../util/format-date';
import LocalisedAmount from '../../currencies/components/localised-amount';
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

const TokenListItem = ({ position, token }) => {
  const tradeCount = _.get(token, 'stats.24h.trades', 0);

  return (
    <tr className={tradeCount === 0 ? 'faded' : undefined}>
      <td className="align-middle">{position}</td>
      <td className="align-middle">
        <TokenLink address={token.address}>
          <TokenImage imageUrl={token.imageUrl} />
        </TokenLink>
      </td>
      <td width="99%">
        <TokenLink address={token.address}>
          {token.name || 'Unknown Token'}
        </TokenLink>
        <br />
        {token.symbol || token.address}
      </td>
      <td className="align-middle" css="text-align: right;">
        {_.has(token, 'price.last') ? (
          <LastTradeLink fillId={token.lastTrade.id}>
            <LocalisedAmount amount={token.price.last} />
            <br />
            <span
              css={`
                font-size: 0.8rem;
                color: ${tradeCount === 0
                  ? colors.santasGray
                  : colors.stormGray};
              `}
            >
              {formatDate(token.lastTrade.date, DATE_FORMAT.RELATIVE)} ago
            </span>
          </LastTradeLink>
        ) : (
          '-'
        )}
      </td>
      <td className="align-middle" css="text-align: right;">
        {tradeCount === 0 ? '-' : tradeCount}
      </td>
      <td className="align-middle" css="text-align: right;">
        <TokenListItemVolume token={token} />
      </td>
    </tr>
  );
};

TokenListItem.propTypes = {
  position: PropTypes.number.isRequired,
  token: PropTypes.object.isRequired,
};

export default TokenListItem;
