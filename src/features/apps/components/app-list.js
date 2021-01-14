import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { getPeriodDescriptor } from '../../../util';
import { HelpIcon } from '../../../components/icons';
import AppLink from './app-link';
import AppLogo from './app-logo';
import AppTradesTooltip from './app-trades-tooltip';
import AppVolumeLabel from './app-volume-label';
import AppVolumeTooltip from './app-volume-tooltip';
import appsPropTypes from '../prop-types';
import Badge from '../../../components/badge';
// import MiniAppMetrics from './mini-app-metrics';
import Number from '../../../components/number';
import PercentageChange from '../../../components/percentage-change';
import Rank from '../../../components/rank';
import sharedPropTypes from '../../../prop-types';
import Th from '../../../components/th';
import Tooltip from '../../../components/tooltip';
import useTableSort from '../../../hooks/use-table-sort';

const AppList = ({
  apps,
  onSort,
  positionOffset,
  sortBy,
  sortDirection,
  statsPeriod,
}) => {
  const periodDescriptor = getPeriodDescriptor(statsPeriod, {
    prefix: 'during',
  });

  const { getSortableColumnProps } = useTableSort({
    onSort,
    sortBy,
    sortDirection,
  });

  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th colSpan="2">App</th>
          <Th
            {...getSortableColumnProps('tradeCount')}
            className="text-right"
            tooltip={
              <p>
                The total number of 0x-based trades made through a given app{' '}
                {periodDescriptor}.
              </p>
            }
          >
            Trades
          </Th>
          <Th
            {...getSortableColumnProps('tradeVolume')}
            className="text-right"
            tooltip={
              <p>
                The total value of all 0x-based trades made through a given app{' '}
                {periodDescriptor}.
              </p>
            }
          >
            Volume
          </Th>
          <Th
            {...getSortableColumnProps('activeTraders')}
            className="text-right"
            tooltip={
              <p>
                The number of unique traders involved in 0x-based trades on a
                given app {periodDescriptor}.
              </p>
            }
          >
            Traders
          </Th>
          {/* <Th
            className="text-right"
            tooltip={
              <p>
                The trend of 0x-based volume for a given app {periodDescriptor}.
              </p>
            }
          >
            Volume Trend
          </Th> */}
        </tr>
      </thead>
      <tbody>
        {apps.map((app, index) => (
          <tr key={app.id}>
            <td className="align-middle text-center">
              <Rank>{positionOffset + index + 1}</Rank>
            </td>
            <td className="align-middle">
              <AppLink urlSlug={app.urlSlug}>
                <AppLogo imageUrl={app.logoUrl} />
              </AppLink>
            </td>
            <td className="align-middle" width="99%">
              <span css="align-items: center; display: flex; margin-bottom: 0.25rem;">
                <AppLink urlSlug={app.urlSlug}>{app.name}</AppLink>
              </span>
              {app.categories.map((category) => (
                <Badge css="margin-right: 0.5rem;" key={category}>
                  {category}
                </Badge>
              ))}
            </td>

            <td className="align-middle text-right">
              <Tooltip
                content={
                  <AppTradesTooltip
                    appName={app.name}
                    period={statsPeriod}
                    tradeCount={app.stats.tradeCount}
                  />
                }
                placement="bottom"
              >
                <span css="display: flex; align-items: center; justify-content: flex-end;">
                  <span>
                    <Number summarize title={false}>
                      {app.stats.tradeCount.total}
                    </Number>
                    {_.isNumber(app.stats.tradeCountChange.total) && (
                      <PercentageChange css="display: block; font-size: 14px;">
                        {app.stats.tradeCountChange.total}
                      </PercentageChange>
                    )}
                  </span>
                  <HelpIcon
                    color={COLORS.NEUTRAL.MYSTIC_500}
                    css="margin-left: 0.5rem;"
                    size={18}
                  />
                </span>
              </Tooltip>
            </td>
            <td className="align-middle text-right">
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
                    <AppVolumeLabel stats={app.stats} />
                    {_.isNumber(app.stats.tradeVolumeChange.total) && (
                      <PercentageChange css="display: block; font-size: 14px;">
                        {app.stats.tradeVolumeChange.total}
                      </PercentageChange>
                    )}
                  </span>
                  <HelpIcon
                    color={COLORS.NEUTRAL.MYSTIC_500}
                    css="margin-left: 0.5rem;"
                    size={18}
                  />
                </span>
              </Tooltip>
            </td>
            <td className="align-middle text-right">
              <Number summarize>{app.stats.activeTraders}</Number>
              {_.isNumber(app.stats.activeTradersChange) && (
                <PercentageChange css="display: block; font-size: 14px;">
                  {app.stats.activeTradersChange}
                </PercentageChange>
              )}
            </td>
            {/* <td>
              <MiniAppMetrics
                appId={app.id}
                height={40}
                period={statsPeriod}
                type="tradeVolume"
                width={120}
              />
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

AppList.propTypes = {
  apps: PropTypes.arrayOf(appsPropTypes.appWithStats).isRequired,
  onSort: PropTypes.func.isRequired,
  positionOffset: PropTypes.number,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  statsPeriod: sharedPropTypes.timePeriod.isRequired,
};

AppList.defaultProps = {
  positionOffset: 0,
};

export default AppList;
