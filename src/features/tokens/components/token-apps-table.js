import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import AppLink from '../../apps/components/app-link';
import AppLogo from '../../apps/components/app-logo';
import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import tokenPropTypes from '../prop-types';
import TokenAmount from './token-amount';

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

const TokenAppsTable = ({ apps, token }) => {
  const breakpoint = useCurrentBreakpoint();

  return (
    <table css="width: 100%;">
      <thead css="display: none;">
        <tr>
          <th colSpan="2">App</th>
          <th>Trade Volume</th>
        </tr>
      </thead>
      <tbody>
        {apps.map((app, index) => (
          <tr
            css={`
              background-color: ${(index + 1) % 2 === 0
                ? COLORS.NEUTRAL.MYSTIC_100
                : 'none'};
            `}
            key={app.id}
          >
            <TableCell css="padding-right: 1.25rem;">
              <AppLogo imageUrl={app.logoUrl} size="2.5rem" />
            </TableCell>
            <TableCell width="99%;">
              <span css="display: flex; align-items: center; line-height: 1;">
                <AppLink urlSlug={app.urlSlug}>{app.name}</AppLink>
              </span>
              {_.isString(app.websiteUrl) ? (
                <SecondaryText as={Link} href={app.websiteUrl}>
                  {_.truncate(app.websiteUrl, {
                    length: breakpoint.greaterThan('xs') ? 35 : 20,
                  })}
                </SecondaryText>
              ) : null}
            </TableCell>
            <TableCell css="text-align: right; white-space: nowrap;">
              <span css="display: block; line-height: 1;">
                <LocalisedAmount amount={app.stats.tradeVolume.USD} summarize />
              </span>
              <SecondaryText>
                <TokenAmount
                  amount={app.stats.tradeVolume.token}
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

TokenAppsTable.propTypes = {
  apps: PropTypes.array.isRequired,
  token: tokenPropTypes.tokenWithStats.isRequired,
};

export default TokenAppsTable;
