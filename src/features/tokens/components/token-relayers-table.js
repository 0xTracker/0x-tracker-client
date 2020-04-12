import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Tooltip from '@tippyjs/react';

import { colors } from '../../../styles/constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import { HelpIcon } from '../../../components/icons';
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
  color: ${colors.stormGray};
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
                ? colors.alabaster
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
                  <Tooltip content="'0x API' trades include fills of orders posted to https://api.0x.org/sra as well as orders filled through https://api.0x.org/swap/quote that point to other DEX protocols like Uniswap and Kyber.">
                    <HelpIcon
                      css="margin-left: 0.5rem; vertical-align: middle;"
                      height={18}
                      width={18}
                    />
                  </Tooltip>
                )}
                {relayer.id === 'unknown' && (
                  <Tooltip content="Unknown relayer volume includes all trades that don't belong to known relayers. These trades could be over the counter (OTC) or belong to relayers which 0x Tracker is not yet indexing.">
                    <HelpIcon
                      css="margin-left: 0.5rem; vertical-align: middle;"
                      height={18}
                      width={18}
                    />
                  </Tooltip>
                )}
              </span>
              {_.isString(relayer.url) ? (
                <SecondaryText as={Link} href={relayer.url}>
                  {_.truncate(relayer.url, {
                    length: breakpoint.greaterThan('xs') ? 35 : 25,
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
