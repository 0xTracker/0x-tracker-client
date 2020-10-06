import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import HelpWidget from '../../../components/help-widget';
import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PercentageChange from '../../../components/percentage-change';
import RelayerImage from './relayer-image';
import RelayerLink from './relayer-link';
import relayersPropTypes from '../prop-types';
import UnknownRelayerImage from './unknown-relayer-image';

const TableCell = styled.td`
  padding-bottom: 1rem;
`;

const TableRow = styled.tr`
  &:last-child ${TableCell} {
    padding-bottom: 0;
  }
`;

const SecondaryText = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_700};
  font-size: 0.9rem;
`;

const TopRelayersTable = ({ relayers }) => {
  const breakpoint = useCurrentBreakpoint();

  return (
    <table css="width: 100%;">
      <thead css="display: none;">
        <tr>
          <th colSpan="2">Token</th>
          <th>Trade Volume</th>
        </tr>
      </thead>
      <tbody>
        {relayers.map((relayer) => (
          <TableRow key={relayer.id}>
            <TableCell css="padding-right: 1.25rem;">
              {relayer.id === 'unknown' ? (
                <UnknownRelayerImage size="2.5rem" />
              ) : (
                <RelayerImage imageUrl={relayer.imageUrl} size="40px" />
              )}
            </TableCell>
            <TableCell width="99%;">
              <span css="display: flex; align-items: center">
                <RelayerLink relayer={relayer.slug}>{relayer.name}</RelayerLink>
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
                    Unknown app volume includes all apps that don&rsquo;t belong
                    to known apps. These trades could be over the counter (OTC)
                    or belong to apps which 0x Tracker is not yet indexing.
                  </HelpWidget>
                )}
              </span>
              {_.isString(relayer.url) ? (
                <SecondaryText as={Link} href={relayer.url} noFollow>
                  {_.truncate(relayer.url, {
                    length: breakpoint.greaterThan('xs') ? 35 : 25,
                  })}
                </SecondaryText>
              ) : null}
            </TableCell>
            <TableCell css="white-space: nowrap; text-align: right;">
              <LocalisedAmount
                amount={relayer.stats.tradeVolume}
                css="font-weight: 500;"
                summarize
              />
              {_.isNumber(relayer.stats.tradeVolumeChange) && (
                <PercentageChange css="display: block;">
                  {relayer.stats.tradeVolumeChange}
                </PercentageChange>
              )}
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </table>
  );
};

TopRelayersTable.propTypes = {
  relayers: PropTypes.arrayOf(relayersPropTypes.relayerWithStats).isRequired,
};

export default TopRelayersTable;
