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
import Number from '../../../components/number';
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
  color: ${COLORS.NEUTRAL.MYSTIC_800};
  font-size: 0.9rem;
`;

const RelatedAppsTable = ({ app, relatedApps }) => {
  const breakpoint = useCurrentBreakpoint();

  return (
    <table css="width: 100%;">
      <thead css="display: none;">
        <tr>
          <th colSpan="2">App</th>
          <th>Shared Volume</th>
        </tr>
      </thead>
      <tbody>
        {relatedApps.map((relatedApp, index) => (
          <tr
            css={`
              background-color: ${(index + 1) % 2 === 0
                ? COLORS.NEUTRAL.MYSTIC_100
                : 'none'};
            `}
            key={relatedApp.id}
          >
            <TableCell css="padding-right: 1.25rem;">
              <AppLink urlSlug={relatedApp.urlSlug}>
                <AppLogo imageUrl={relatedApp.logoUrl} size="2.5rem" />
              </AppLink>
            </TableCell>
            <TableCell width="99%;">
              <span css="display: flex; align-items: center; line-height: 1;">
                <AppLink urlSlug={relatedApp.urlSlug}>
                  {relatedApp.name}
                </AppLink>
              </span>
              {_.isString(relatedApp.websiteUrl) ? (
                <SecondaryText as={Link} href={relatedApp.websiteUrl}>
                  {_.truncate(relatedApp.websiteUrl, {
                    length: breakpoint.greaterThan('xs') ? 35 : 20,
                  })}
                </SecondaryText>
              ) : null}
            </TableCell>
            <TableCell css="text-align: right; white-space: nowrap;">
              <Tooltip
                content={
                  <>
                    {relatedApp.stats.tradeCount.relayer > 0 && (
                      <p>
                        {relatedApp.name}{' '}
                        <strong>
                          relayed{' '}
                          <Number summarize>
                            {relatedApp.stats.tradeCount.relayer}
                          </Number>
                        </strong>{' '}
                        of the trades consumed by {app.name} in this period,{' '}
                        totalling{' '}
                        <strong>
                          <LocalisedAmount
                            amount={relatedApp.stats.tradeVolume.relayer}
                            summarize
                          />
                        </strong>{' '}
                        in volume.
                      </p>
                    )}
                    {relatedApp.stats.tradeCount.consumer > 0 && (
                      <p>
                        {relatedApp.name}{' '}
                        <strong>
                          consumed{' '}
                          <Number>
                            {relatedApp.stats.tradeCount.consumer}
                          </Number>
                        </strong>{' '}
                        of the trades relayed by {app.name} in this period,{' '}
                        totalling{' '}
                        <strong>
                          <LocalisedAmount
                            amount={relatedApp.stats.tradeVolume.consumer}
                            summarize
                          />
                        </strong>{' '}
                        in volume.
                      </p>
                    )}
                    <p>
                      The average size of trades involving both{' '}
                      {relatedApp.name} and {app.name} was{' '}
                      <strong>
                        <LocalisedAmount
                          amount={
                            relatedApp.stats.tradeVolume.total /
                            relatedApp.stats.tradeCount.total
                          }
                          summarize
                        />
                      </strong>
                      .
                    </p>
                  </>
                }
                placement="bottom"
              >
                <span css="display: flex; align-items: center; justify-content: flex-end;">
                  <span>
                    <span css="display: block;">
                      <LocalisedAmount
                        amount={relatedApp.stats.tradeVolume.total}
                        summarize
                        title={false}
                      />
                    </span>
                    <SecondaryText>
                      <Number summarize title={false}>
                        {relatedApp.stats.tradeCount.total}
                      </Number>{' '}
                      trades
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
};

RelatedAppsTable.propTypes = {
  app: appsPropTypes.app.isRequired,
  relatedApps: PropTypes.array.isRequired,
};

export default RelatedAppsTable;
