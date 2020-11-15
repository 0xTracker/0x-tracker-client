import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import AppLogo from './app-logo';
import appsPropTypes from '../prop-types';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PercentageChange from '../../../components/percentage-change';
import EntityList from '../../../components/entity-list';
import EntityListItem from '../../../components/entity-list-item';
import buildAppUrl from '../util/build-app-url';
import { HelpIcon } from '../../../components/icons';
import { COLORS } from '../../../styles/constants';
import Tooltip from '../../../components/tooltip';
import AppVolumeTooltip from './app-volume-tooltip';
import sharedPropTypes from '../../../prop-types';

const TopAppsTable = ({ apps, statsPeriod }) => (
  <EntityList>
    {apps.map((app, index) => (
      <EntityListItem
        complement={
          <Tooltip
            content={
              <AppVolumeTooltip
                appName={app.name}
                period={statsPeriod}
                tradeVolume={app.stats.tradeVolume}
              />
            }
            placement="bottom"
          >
            <span css="display: flex; align-items: center; justify-content: flex-end;">
              <span>
                <LocalisedAmount
                  amount={app.stats.tradeVolume.total}
                  css="font-weight: 500;"
                  summarize
                  title={false}
                />
                {_.isNumber(app.stats.tradeVolumeChange.total) && (
                  <PercentageChange css="display: block;">
                    {app.stats.tradeVolumeChange.total}
                  </PercentageChange>
                )}
              </span>
              <HelpIcon
                color={COLORS.NEUTRAL.MYSTIC_500}
                css="margin-left: 0.75rem;"
                size={18}
              />
            </span>
          </Tooltip>
        }
        image={<AppLogo imageUrl={app.logoUrl} size="40px" />}
        index={index}
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

TopAppsTable.propTypes = {
  apps: PropTypes.arrayOf(appsPropTypes.appWithStats).isRequired,
  statsPeriod: sharedPropTypes.timePeriod.isRequired,
};

export default TopAppsTable;
