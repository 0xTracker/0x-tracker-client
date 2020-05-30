import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { truncateAddress } from '../../../util';
import LocalisedAmount from '../../currencies/components/localised-amount';
import TokenAmount from '../../tokens/components/token-amount';
import TokenImage from '../../tokens/components/token-image';
import TokenLink from '../../tokens/components/token-link';

const TableCell = styled.td`
  height: 80px;
  padding: 1rem 0;

  &:first-child {
    padding-left: 1rem;
  }

  &:last-child {
    padding-right: 1rem;
  }
`;

const SecondaryText = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_700};
  font-size: 0.9rem;
`;

const RelayerTokensTable = ({ tokens }) => (
  <table css="width: 100%;">
    <thead css="display: none;">
      <tr>
        <th colSpan="2">Token</th>
        <th>Trade Volume</th>
      </tr>
    </thead>
    <tbody>
      {tokens.map((token, index) => (
        <tr
          css={`
            background-color: ${(index + 1) % 2 === 0
              ? COLORS.NEUTRAL.MYSTIC_100
              : 'none'};
          `}
          key={token.address}
        >
          <TableCell css="padding-right: 1.25rem;">
            <TokenImage imageUrl={token.imageUrl} size="2.5rem" />
          </TableCell>
          <TableCell width="99%;">
            <TokenLink
              address={token.address}
              css="display: block; line-height: 1;"
            >
              {token.name}
            </TokenLink>
            <SecondaryText address={token.address} as={TokenLink}>
              {truncateAddress(token.address, 30)}
            </SecondaryText>
          </TableCell>
          <TableCell css="text-align: right; white-space: nowrap;">
            <LocalisedAmount
              amount={token.stats.tradeVolume.USD}
              css="font-weight: 500;"
              summarize
            />
            <br />
            <SecondaryText>
              <TokenAmount
                amount={token.stats.tradeVolume.token}
                linked={false}
                summarize
                token={token}
              />
            </SecondaryText>
          </TableCell>
        </tr>
      ))}
    </tbody>
  </table>
);

RelayerTokensTable.propTypes = {
  tokens: PropTypes.array.isRequired,
};

export default RelayerTokensTable;
