import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import AppLink from './app-link';
import AppLogo from './app-logo';
import appsPropTypes from '../prop-types';
import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PercentageChange from '../../../components/percentage-change';

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

const TopAppsTable = ({ apps }) => {
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
        {apps.map((app) => (
          <TableRow key={app.id}>
            <TableCell css="padding-right: 1.25rem;">
              <AppLogo imageUrl={app.logoUrl} size="40px" />
            </TableCell>
            <TableCell width="99%;">
              <span css="display: flex; align-items: center">
                <AppLink urlSlug={app.urlSlug}>{app.name}</AppLink>
              </span>
              {_.isString(app.websiteUrl) ? (
                <SecondaryText as={Link} href={app.websiteUrl} noFollow>
                  {_.truncate(app.websiteUrl, {
                    length: breakpoint.greaterThan('xs') ? 35 : 25,
                  })}
                </SecondaryText>
              ) : null}
            </TableCell>
            <TableCell css="white-space: nowrap; text-align: right;">
              <LocalisedAmount
                amount={app.stats.tradeVolume.total}
                css="font-weight: 500;"
                summarize
              />
              {_.isNumber(app.stats.tradeVolumeChange.total) && (
                <PercentageChange css="display: block;">
                  {app.stats.tradeVolumeChange.total}
                </PercentageChange>
              )}
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </table>
  );
};

TopAppsTable.propTypes = {
  apps: PropTypes.arrayOf(appsPropTypes.appWithStats).isRequired,
};

export default TopAppsTable;
