import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Number from '../../../components/number';
import TokenImage from './token-image';
import TokenLink from './token-link';
import tokensPropTypes from '../prop-types';

const TableCell = styled.td`
  padding-bottom: 1rem;
`;

const TableRow = styled.tr`
  &:last-child ${TableCell} {
    padding-bottom: 0;
  }
`;

const SecondaryText = styled.span`
  color: ${colors.stormGray};
  font-size: 0.9rem;
`;

const TopTokensTable = ({ statsPeriod, tokens }) => (
  <table css="width: 100%;">
    <thead css="display: none;">
      <tr>
        <th colSpan="2">Token</th>
        <th>Volume</th>
      </tr>
    </thead>
    <tbody>
      {tokens.map((token) => (
        <TableRow key={token.address}>
          <TableCell css="padding-right: 1.25rem;">
            <TokenImage imageUrl={token.imageUrl} size="40px" />
          </TableCell>
          <TableCell width="99%">
            <TokenLink
              address={token.address}
              css="font-weight: 500;"
              params={{ statsPeriod }}
            >
              {token.symbol}
            </TokenLink>
            <br />
            <SecondaryText>
              {_.truncate(token.name, { length: 35 })}
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
              <Number summarize>{token.stats.tradeVolume.token}</Number>{' '}
              {token.symbol}
            </SecondaryText>
          </TableCell>
        </TableRow>
      ))}
    </tbody>
  </table>
);

TopTokensTable.propTypes = {
  statsPeriod: PropTypes.string.isRequired,
  tokens: PropTypes.arrayOf(tokensPropTypes.tokenWithStats).isRequired,
};

export default TopTokensTable;
