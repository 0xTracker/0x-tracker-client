import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { truncateAddress } from '../../../util';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Number from '../../../components/number';
import TokenAmount from '../../tokens/components/token-amount';
import TokenImage from '../../tokens/components/token-image';
import TokenLink from '../../tokens/components/token-link';
import Tooltip from '../../../components/tooltip';
import { HelpIcon } from '../../../components/icons';

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

const AppTokensTable = ({ appName, tokens }) => (
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
            <TokenLink address={token.address}>
              <TokenImage imageUrl={token.imageUrl} size="2.5rem" />
            </TokenLink>
          </TableCell>
          <TableCell width="99%">
            <TokenLink
              address={token.address}
              css="display: block; line-height: 1; margin-bottom: 0.2rem;"
            >
              {_.truncate(token.name, { length: 20 })}
            </TokenLink>
            <SecondaryText address={token.address} as={TokenLink}>
              {truncateAddress(token.address, 20)}
            </SecondaryText>
          </TableCell>
          <TableCell css="text-align: right; white-space: nowrap;">
            <Tooltip
              content={
                <>
                  <p>
                    There were{' '}
                    <strong>
                      <Number summarize>{token.stats.tradeCount}</Number> trades
                    </strong>{' '}
                    involving {token.name} on {appName} in the selected period,
                    totalling{' '}
                    <strong>
                      <TokenAmount
                        amount={token.stats.tradeVolume.token}
                        linked={false}
                        summarize
                        token={token}
                      />{' '}
                      (
                      <LocalisedAmount
                        amount={token.stats.tradeVolume.USD}
                        summarize
                      />
                      )
                    </strong>
                    .
                  </p>
                  <p>
                    The average size of trades on {appName} involving{' '}
                    {token.name} for this period was{' '}
                    <strong>
                      <TokenAmount
                        amount={
                          token.stats.tradeVolume.token / token.stats.tradeCount
                        }
                        linked={false}
                        summarize
                        token={token}
                      />{' '}
                      (
                      <LocalisedAmount
                        amount={
                          token.stats.tradeVolume.USD / token.stats.tradeCount
                        }
                        summarize
                      />
                      )
                    </strong>
                    .
                  </p>
                </>
              }
              placement="bottom"
            >
              <span css="display: flex; align-items: center; justify-content: flex-end;">
                <span>
                  <span css="display: block; line-height: 1; margin-bottom: 0.2rem;">
                    {token.stats.tradeVolume.USD === 0 ? (
                      'Unknown'
                    ) : (
                      <LocalisedAmount
                        amount={token.stats.tradeVolume.USD}
                        summarize
                      />
                    )}
                  </span>
                  <SecondaryText>
                    <TokenAmount
                      amount={token.stats.tradeVolume.token}
                      linked={false}
                      summarize
                      token={token}
                    />
                  </SecondaryText>
                </span>
                <HelpIcon
                  color={COLORS.NEUTRAL.MYSTIC_500}
                  css="margin-left: 0.75rem;"
                  size={18}
                />
              </span>
            </Tooltip>
          </TableCell>
        </tr>
      ))}
    </tbody>
  </table>
);

AppTokensTable.propTypes = {
  appName: PropTypes.string.isRequired,
  tokens: PropTypes.array.isRequired,
};

export default AppTokensTable;
