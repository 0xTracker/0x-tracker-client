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
  color: ${colors.stormGray};
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
        {relayers.map(relayer => (
          <TableRow key={relayer.id}>
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
              {relayer.url !== undefined ? (
                <SecondaryText as={Link} href={relayer.url}>
                  {_.truncate(relayer.url, {
                    length: breakpoint.greaterThan('xs') ? 35 : 25,
                  })}
                </SecondaryText>
              ) : null}
            </TableCell>
            <TableCell css="text-align: right;">
              <LocalisedAmount
                amount={relayer.stats.tradeVolume}
                css="font-weight: 500;"
                summarize
              />
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
