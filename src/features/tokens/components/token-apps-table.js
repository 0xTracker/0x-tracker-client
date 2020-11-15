import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import AppLogo from '../../apps/components/app-logo';
import LocalisedAmount from '../../currencies/components/localised-amount';
import tokenPropTypes from '../prop-types';
import TokenAmount from './token-amount';
import buildAppUrl from '../../apps/util/build-app-url';
import EntityList from '../../../components/entity-list';
import EntityListItem from '../../../components/entity-list-item';

const SecondaryText = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_800};
  font-size: 0.9rem;
`;

const TokenAppsTable = ({ apps, token }) => (
  <EntityList>
    {apps.map((app) => (
      <EntityListItem
        complement={
          <>
            <span css="display: block;">
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
          </>
        }
        image={<AppLogo imageUrl={app.logoUrl} size="40px" />}
        key={app.id}
        metadata={app.categories.map((category, categoryIndex) => ({
          label: `Category ${categoryIndex + 1}`,
          value: category,
        }))}
        title={app.name}
        url={buildAppUrl(app.urlSlug)}
      />
    ))}
  </EntityList>
);

TokenAppsTable.propTypes = {
  apps: PropTypes.array.isRequired,
  token: tokenPropTypes.tokenWithStats.isRequired,
};

export default TokenAppsTable;
