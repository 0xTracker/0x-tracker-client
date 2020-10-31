/* eslint-disable react/prop-types, react/display-name, react/no-multi-comp */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { getPeriodDescriptor } from '../../../util';
import AppLink from './app-link';
import AppLogo from './app-logo';
import AppTradesTooltip from './app-trades-tooltip';
import AppVolumeLabel from './app-volume-label';
import AppVolumeTooltip from './app-volume-tooltip';
import appsPropTypes from '../prop-types';
import Badge from '../../../components/badge';
import MiniAppMetrics from './mini-app-metrics';
import Number from '../../../components/number';
import PercentageChange from '../../../components/percentage-change';
import Rank from '../../../components/rank';
import sharedPropTypes from '../../../prop-types';
import Tooltip from '../../../components/tooltip';
import Table from '../../../components/table';

const AppList = ({ apps, positionOffset, statsPeriod }) => {
  const periodDescriptor = getPeriodDescriptor(statsPeriod, {
    prefix: 'during',
  });

  const data = React.useMemo(
    () =>
      apps.map((app, index) => ({
        ...app,
        position: positionOffset + index + 1,
      })),
    [apps],
  );

  const columns = React.useMemo(
    () => [
      {
        Cell: ({ value }) => <Rank>{value}</Rank>,
        Header: '#',
        accessor: 'position',
        align: 'center',
      },
      {
        Cell: ({ row, value }) => (
          <div css="display: flex; width: 100%;">
            <AppLink
              css="align-self: center; margin-right: 2rem;"
              urlSlug={row.original.urlSlug}
            >
              <AppLogo imageUrl={row.original.logoUrl} />
            </AppLink>
            <div>
              <span css="align-items: center; display: flex; margin-bottom: 0.25rem;">
                <AppLink urlSlug={row.original.urlSlug}>{value}</AppLink>
              </span>
              {row.original.categories.map((category) => (
                <Badge css="margin-right: 0.5rem;" key={category}>
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        ),
        Header: 'App',
        accessor: 'name',
        width: '99%',
      },
      {
        Cell: ({ row, value }) => (
          <Tooltip
            content={
              <AppTradesTooltip
                appName={row.original.name}
                period={statsPeriod}
                tradeCount={row.original.stats.tradeCount}
              />
            }
            iconColor={COLORS.NEUTRAL.MYSTIC_500}
            placement="bottom"
          >
            <Number summarize title={false}>
              {value}
            </Number>
            {_.isNumber(row.original.stats.tradeCountChange.total) && (
              <PercentageChange css="display: block; font-size: 14px;">
                {row.original.stats.tradeCountChange.total}
              </PercentageChange>
            )}
          </Tooltip>
        ),
        Header: () => (
          <Tooltip
            content={`The total number of 0x-based trades made through a given app ${periodDescriptor}.`}
            icon
          >
            Trades
          </Tooltip>
        ),
        accessor: 'stats.tradeCount.total',
        align: 'right',
      },
      {
        Cell: ({ row }) => (
          <Tooltip
            content={
              <AppVolumeTooltip
                appName={row.original.name}
                period={statsPeriod}
                tradeVolume={row.original.stats.tradeVolume}
              />
            }
            iconColor={COLORS.NEUTRAL.MYSTIC_500}
            placement="bottom"
          >
            <AppVolumeLabel stats={row.original.stats} />
            {_.isNumber(row.original.stats.tradeVolumeChange.total) && (
              <PercentageChange css="display: block; font-size: 14px;">
                {row.original.stats.tradeVolumeChange.total}
              </PercentageChange>
            )}
          </Tooltip>
        ),
        Header: () => (
          <Tooltip
            content={`The total value of all 0x-based trades made through a given app ${periodDescriptor}.`}
            icon
          >
            Volume
          </Tooltip>
        ),
        accessor: 'stats.tradeVolume.total',
        align: 'right',
      },
      {
        Cell: ({ row, value }) => (
          <div css="text-align: right;">
            <Number summarize>{value}</Number>
            {_.isNumber(row.original.stats.activeTradersChange) && (
              <PercentageChange css="display: block; font-size: 14px;">
                {row.original.stats.activeTradersChange}
              </PercentageChange>
            )}
          </div>
        ),
        Header: () => (
          <Tooltip
            content={`The number of unique traders involved in 0x-based trades on a given app ${periodDescriptor}.`}
            icon
          >
            Traders
          </Tooltip>
        ),
        accessor: 'stats.activeTraders',
        align: 'right',
      },
      {
        Cell: ({ value }) => (
          <MiniAppMetrics
            appId={value}
            height={40}
            period={statsPeriod}
            type="tradeVolume"
            width={120}
          />
        ),
        Header: () => (
          <Tooltip
            content={`The trend of 0x-based volume for a given app ${periodDescriptor}.`}
            icon
          >
            Volume Trend
          </Tooltip>
        ),
        accessor: 'id',
      },
    ],
    [],
  );

  return <Table columns={columns} data={data} />;
};

AppList.propTypes = {
  apps: PropTypes.arrayOf(appsPropTypes.appWithStats).isRequired,
  positionOffset: PropTypes.number,
  statsPeriod: sharedPropTypes.timePeriod.isRequired,
};

AppList.defaultProps = {
  positionOffset: 0,
};

export default AppList;
/* eslint-enable react/prop-types, react/display-name, react/no-multi-comp */
