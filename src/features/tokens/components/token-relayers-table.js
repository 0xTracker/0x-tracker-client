import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import HelpWidget from '../../../components/help-widget';
import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import RelayerImage from '../../relayers/components/relayer-image';
import RelayerLink from '../../relayers/components/relayer-link';
import tokenPropTypes from '../prop-types';
import TokenAmount from './token-amount';
import UnknownRelayerImage from '../../relayers/components/unknown-relayer-image';

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

const TokenRelayersTable = ({ relayers, token }) => {
  const breakpoint = useCurrentBreakpoint();

  return (
    <table css="width: 100%;">
      <thead css="display: none;">
        <tr>
          <th colSpan="2">Relayer</th>
          <th>Trade Volume</th>
        </tr>
      </thead>
      <tbody>
        {relayers.map((relayer, index) => (
          <tr
            css={`
              background-color: ${(index + 1) % 2 === 0
                ? COLORS.NEUTRAL.MYSTIC_100
                : 'none'};
            `}
            key={relayer.id}
          >
            <TableCell css="padding-right: 1.25rem;">
              {relayer.id === 'unknown' ? (
                <UnknownRelayerImage size="2.5rem" />
              ) : (
                <RelayerImage imageUrl={relayer.imageUrl} size="2.5rem" />
              )}
            </TableCell>
            <TableCell width="99%;">
              <span css="display: flex; align-items: center">
                <RelayerLink css="font-weight: 500;" relayer={relayer.slug}>
                  {relayer.name}
                </RelayerLink>
                {relayer.id === 'zeroExApi' && (
                  <HelpWidget css="margin-left: 0.5rem; vertical-align: middle;">
                    &lsquo;0x API&rsquo; trades include fills of orders posted
                    to https://api.0x.org/sra as well as orders filled through
                    https://api.0x.org/swap/quote that point to other DEX
                    protocols like Uniswap and Kyber.
                  </HelpWidget>
                )}
                {relayer.id === 'unknown' && (
                  <HelpWidget css="margin-left: 0.5rem; vertical-align: middle;">
                    Unknown relayer volume includes all trades that don&rsquo;t
                    belong to known relayers. These trades could be over the
                    counter (OTC) or belong to relayers which 0x Tracker is not
                    yet indexing.
                  </HelpWidget>
                )}
              </span>
              {_.isString(relayer.url) ? (
                <SecondaryText as={Link} href={relayer.url}>
                  {_.truncate(relayer.url, {
                    length: breakpoint.greaterThan('xs') ? 35 : 20,
                  })}
                </SecondaryText>
              ) : null}
            </TableCell>
            <TableCell css="text-align: right; white-space: nowrap;">
              <LocalisedAmount
                amount={
                  relayer.id === 'unknown'
                    ? relayer.stats.fillVolume.USD
                    : relayer.stats.tradeVolume.USD
                }
                css="font-weight: 500;"
                summarize
              />
              <br />
              <SecondaryText>
                <TokenAmount
                  amount={
                    relayer.id === 'unknown'
                      ? relayer.stats.fillVolume.token
                      : relayer.stats.tradeVolume.token
                  }
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
};

TokenRelayersTable.propTypes = {
  relayers: PropTypes.array.isRequired,
  token: tokenPropTypes.tokenWithStats.isRequired,
};

export default TokenRelayersTable;
