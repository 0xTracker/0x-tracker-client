import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { BASE_CURRENCY } from '../../currencies/constants';
import { DATE_FORMAT } from '../../../constants';
import { colors } from '../../../styles/constants';
import FillLink from '../../fills/components/fill-link';
import formatDate from '../../../util/format-date';
import LocalisedAmount from '../../currencies/components/localised-amount';
import TokenImage from './token-image';
import TokenLink from './token-link';
import TokenListItemVolume from './token-list-item-volume';
import tokenPropTypes from '../prop-types';

const LastTradeLink = styled(FillLink)`
  color: inherit;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const TokenListItem = ({ position, token }) => (
  <tr
    className={classNames({
      faded: token.trades === 0,
    })}
    key={token.address}
  >
    <td className="align-middle">{position}</td>
    <td className="align-middle">
      <TokenLink token={token}>
        <TokenImage imageUrl={token.imageUrl} />
      </TokenLink>
    </td>
    <td width="99%">
      <TokenLink token={token}>{token.name}</TokenLink>
      <br />
      {token.symbol}
    </td>
    <td className="align-middle" css="text-align: right;">
      {_.has(token, 'price.lastTrade') && !_.isEmpty(token.price.lastTrade) ? (
        <LastTradeLink fillId={token.price.lastTrade.id}>
          <LocalisedAmount amount={token.price.lastPrice[BASE_CURRENCY]} />
          <br />
          <span
            css={`
              font-size: 0.8em;
              color: ${token.trades === 0
                ? colors.santasGray
                : colors.stormGray};
            `}
          >
            {formatDate(token.price.lastTrade.date, DATE_FORMAT.RELATIVE)} ago
          </span>
        </LastTradeLink>
      ) : (
        '-'
      )}
    </td>
    <td className="align-middle" css="text-align: right;">
      {token.trades === 0 ? '-' : token.trades}
    </td>
    <td className="align-middle" css="text-align: right;">
      <TokenListItemVolume token={token} />
    </td>
  </tr>
);

TokenListItem.propTypes = {
  position: PropTypes.number.isRequired,
  token: tokenPropTypes.token.isRequired,
};

export default TokenListItem;
