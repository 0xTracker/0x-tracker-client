import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import AppLink from './app-link';
import AppLogo from './app-logo';
import AppVolumeLabel from './app-volume-label';
import appsPropTypes from '../prop-types';
import Badge from '../../../components/badge';
import HelpWidget from '../../../components/help-widget';
import MiniAppMetrics from './mini-app-metrics';
import Number from '../../../components/number';
import PercentageChange from '../../../components/percentage-change';
import Rank from '../../../components/rank';
import sharedPropTypes from '../../../prop-types';

const AppList = ({ apps, positionOffset, statsPeriod }) => (
  <table className="table table-responsive">
    <thead>
      <tr>
        <th className="text-center">#</th>
        <th colSpan="2">App</th>
        <th className="text-right">
          Trades
          <HelpWidget css="margin-left: 0.25rem;">
            Total value of all 0x-based trades made through this app in the
            selected period.
          </HelpWidget>
        </th>
        <th className="text-right">
          Volume
          <HelpWidget css="margin-left: 0.25rem;">
            Total number of 0x-based trades made through this app in the
            selected period.
          </HelpWidget>
        </th>
        <th className="text-right">
          Traders{' '}
          <HelpWidget css="margin-left: 0.25rem;">
            Number of unique traders involved in 0x-based trades on this app in
            the selected period.
          </HelpWidget>
        </th>
        <th className="text-right">
          Volume Trend
          <HelpWidget css="margin-left: 0.25rem;">
            The trend of 0x-based trading volume for this app in the selected
            period.
          </HelpWidget>
        </th>
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
            <Number summarize>{app.stats.tradeCount.total}</Number>
            {_.isNumber(app.stats.tradeCountChange.total) && (
              <PercentageChange css="display: block; font-size: 14px;">
                {app.stats.tradeCountChange.total}
              </PercentageChange>
            )}
          </td>
          <td className="align-middle text-right">
            <AppVolumeLabel stats={app.stats} />
            {_.isNumber(app.stats.tradeVolumeChange.total) && (
              <PercentageChange css="display: block; font-size: 14px;">
                {app.stats.tradeVolumeChange.total}
              </PercentageChange>
            )}
          </td>
          <td className="align-middle text-right">
            <Number summarize>{app.stats.activeTraders}</Number>
            {_.isNumber(app.stats.activeTradersChange) && (
              <PercentageChange css="display: block; font-size: 14px;">
                {app.stats.activeTradersChange}
              </PercentageChange>
            )}
          </td>
          <td>
            <MiniAppMetrics
              appId={app.id}
              height={40}
              period={statsPeriod}
              type="tradeVolume"
              width={120}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

AppList.propTypes = {
  apps: PropTypes.arrayOf(appsPropTypes.appWithStats).isRequired,
  positionOffset: PropTypes.number,
  statsPeriod: sharedPropTypes.timePeriod.isRequired,
};

AppList.defaultProps = {
  positionOffset: 0,
};

export default AppList;
