import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import AppLogo from './app-logo';
import appsPropTypes from '../prop-types';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Number from '../../../components/number';
import Tooltip from '../../../components/tooltip';
import { HelpIcon } from '../../../components/icons';
import EntityList from '../../../components/entity-list';
import EntityListItem from '../../../components/entity-list-item';
import buildAppUrl from '../util/build-app-url';

const SecondaryText = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_800};
  font-size: 0.9rem;
`;

const RelatedAppsTable = ({ app, relatedApps }) => (
  <EntityList>
    {relatedApps.map((relatedApp) => (
      <EntityListItem
        complement={
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
                      <Number>{relatedApp.stats.tradeCount.consumer}</Number>
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
                  The average size of trades involving both {relatedApp.name}{' '}
                  and {app.name} was{' '}
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
                    css="font-weight: 500;"
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
        }
        image={<AppLogo imageUrl={relatedApp.logoUrl} size="40px" />}
        key={relatedApp.id}
        metadata={relatedApp.categories.map((category, categoryIndex) => ({
          label: `Category ${categoryIndex + 1}`,
          value: category,
        }))}
        title={relatedApp.name}
        url={buildAppUrl(relatedApp.urlSlug)}
      />
    ))}
  </EntityList>
);

RelatedAppsTable.propTypes = {
  app: appsPropTypes.app.isRequired,
  relatedApps: PropTypes.array.isRequired,
};

export default RelatedAppsTable;
