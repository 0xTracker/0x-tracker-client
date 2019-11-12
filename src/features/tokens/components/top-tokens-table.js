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

const TopTokensTable = ({ tokens }) => (
  <table css="width: 100%;">
    <thead css="display: none;">
      <tr>
        <th colSpan="2">Token</th>
        <th>Fill Volume</th>
      </tr>
    </thead>
    <tbody>
      {tokens.map(token => (
        <TableRow key={token.address}>
          <TableCell>
            <TokenImage imageUrl={token.imageUrl} size="2.5rem" />
          </TableCell>
          <TableCell>
            <TokenLink address={token.address} css="font-weight: 500;">
              {token.symbol}
            </TokenLink>
            <br />
            <SecondaryText>
              {_.truncate(token.name, { length: 35 })}
            </SecondaryText>
          </TableCell>
          <TableCell css="text-align: right;">
            <LocalisedAmount
              amount={token.stats.fillVolume.USD}
              css="font-weight: 500;"
              summarize
            />
            <br />
            <SecondaryText>
              <Number summarize>{token.stats.fillVolume.token}</Number>{' '}
              {token.symbol}
            </SecondaryText>
          </TableCell>
        </TableRow>
      ))}
    </tbody>
  </table>
);

TopTokensTable.propTypes = {
  tokens: PropTypes.arrayOf(tokensPropTypes.tokenWithStats).isRequired,
};

export default TopTokensTable;
