import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import AssetBridgeImage from './asset-bridge-image';
import HelpWidget from '../../../components/help-widget';
import LocalisedAmount from '../../currencies/components/localised-amount';
import MiniBridgeMetrics from './mini-bridge-metrics';
import Number from '../../../components/number';
import Rank from '../../../components/rank';
import TraderLink from '../../traders/components/trader-link';

const AssetBridgeList = ({ assetBridges, positionOffset, statsPeriod }) => (
  <table className="table table-responsive">
    <thead>
      <tr>
        <th className="text-center">#</th>
        <th colSpan="2">Bridge</th>
        <th className="text-right">
          Trades
          <HelpWidget css="margin-left: 0.25rem;">
            The number of trades which involved a given bridge in the selected
            period.
          </HelpWidget>
        </th>
        <th className="text-right">
          Volume
          <HelpWidget css="margin-left: 0.25rem;">
            The total volume of all trades which involved a given bridge in the
            selected period.
          </HelpWidget>
        </th>
        <th className="text-right">
          Volume Trend
          <HelpWidget css="margin-left: 0.25rem;">
            The trend of trading volume for a given bridge in the selected
            period.
          </HelpWidget>
        </th>
      </tr>
    </thead>
    <tbody>
      {assetBridges.map((bridge, index) => (
        <tr key={bridge.address}>
          <td className="align-middle text-center">
            <Rank>{positionOffset + index + 1}</Rank>
          </td>
          <td className="align-middle">
            <TraderLink address={bridge.address}>
              <AssetBridgeImage
                imageUrl={bridge.imageUrl}
                isPrivate={
                  _.isString(bridge.name) && bridge.name.startsWith('Private')
                }
              />
            </TraderLink>
          </td>
          <td className="align-middle" width="99%">
            <TraderLink address={bridge.address}>
              {_.isString(bridge.name) ? bridge.name : 'Unknown Bridge'}
              <div
                css={`
                  color: ${COLORS.NEUTRAL.MYSTIC_800};
                `}
              >
                {bridge.address}
              </div>
            </TraderLink>
          </td>
          <td className="align-middle text-right">
            <Number summarize>{bridge.stats.tradeCount}</Number>
          </td>
          <td className="align-middle text-right">
            <LocalisedAmount amount={bridge.stats.tradeVolume} summarize />
          </td>
          <td>
            <MiniBridgeMetrics
              bridgeAddress={bridge.address}
              height={40}
              period={statsPeriod}
              width={120}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

AssetBridgeList.propTypes = {
  assetBridges: PropTypes.array.isRequired,
  positionOffset: PropTypes.number.isRequired,
  statsPeriod: PropTypes.string.isRequired,
};

export default AssetBridgeList;
