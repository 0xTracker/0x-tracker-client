import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import HelpWidget from '../../../components/help-widget';
import Link from '../../../components/link';
import MiniRelayerMetrics from '../../metrics/components/mini-relayer-metrics';
import Number from '../../../components/number';
import PercentageChange from '../../../components/percentage-change';
import Rank from '../../../components/rank';
import relayersPropTypes from '../prop-types';
import RelayerImage from './relayer-image';
import RelayerVolumeLabel from './relayer-volume-label';
import RelayerLink from './relayer-link';
import sharedPropTypes from '../../../prop-types';
import UnknownRelayerImage from './unknown-relayer-image';

const RelayerList = ({ positionOffset, relayers, statsPeriod }) => (
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
      {relayers.map((relayer, index) => (
        <tr key={relayer.id}>
          <td className="align-middle text-center">
            <Rank>{positionOffset + index + 1}</Rank>
          </td>
          <td className="align-middle">
            <RelayerLink relayer={relayer.slug}>
              {relayer.id === 'unknown' ? (
                <UnknownRelayerImage size={40} />
              ) : (
                <RelayerImage imageUrl={relayer.imageUrl} />
              )}
            </RelayerLink>
          </td>
          <td className="align-middle" width="99%">
            <span css="align-items: center; display: flex;">
              <RelayerLink relayer={relayer.slug}>{relayer.name}</RelayerLink>
              {relayer.id === 'zeroExApi' && (
                <HelpWidget css="margin-left: 0.5rem; vertical-align: middle;">
                  &lsquo;0x API&rsquo; trades include fills of orders posted to
                  https://api.0x.org/sra as well as orders filled through
                  https://api.0x.org/swap/quote that point to other DEX
                  protocols like Uniswap and Kyber.
                </HelpWidget>
              )}
              {relayer.id === 'unknown' && (
                <HelpWidget css="margin-left: 0.5rem; vertical-align: middle;">
                  Unknown app volume includes all trades that don&rsquo;t belong
                  to known apps. These trades could be over the counter (OTC) or
                  belong to app which 0x Tracker is not yet aware of.
                </HelpWidget>
              )}
              {relayer.id === 'oneInchExchange' && (
                <HelpWidget css="margin-left: 0.5rem; vertical-align: middle;">
                  &lsquo;1inch.exchange&rsquo; trades only include fills of
                  limit orders. Full tracking for 0x-based 1inch.exchange trades
                  is coming soon.
                </HelpWidget>
              )}
            </span>
            {relayer.url ? (
              <Link
                css={`
                  color: ${COLORS.NEUTRAL.MYSTIC_600};
                  font-size: 0.9rem;
                `}
                href={relayer.url}
                noFollow
              >
                {relayer.url}
              </Link>
            ) : null}
          </td>

          <td className="align-middle text-right">
            <Number summarize>{relayer.stats.tradeCount}</Number>
            {_.isNumber(relayer.stats.tradeCountChange) && (
              <PercentageChange css="display: block; font-size: 14px;">
                {relayer.stats.tradeCountChange}
              </PercentageChange>
            )}
          </td>
          <td className="align-middle text-right">
            <RelayerVolumeLabel stats={relayer.stats} />
            {_.isNumber(relayer.stats.tradeVolumeChange) && (
              <PercentageChange css="display: block; font-size: 14px;">
                {relayer.stats.tradeVolumeChange}
              </PercentageChange>
            )}
          </td>
          <td className="align-middle text-right">
            <Number summarize>{relayer.stats.traderCount}</Number>
            {_.isNumber(relayer.stats.traderCountChange) && (
              <PercentageChange css="display: block; font-size: 14px;">
                {relayer.stats.traderCountChange}
              </PercentageChange>
            )}
          </td>
          <td>
            <MiniRelayerMetrics
              height={40}
              period={statsPeriod}
              relayerId={relayer.id}
              type="tradeVolume"
              width={120}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

RelayerList.propTypes = {
  positionOffset: PropTypes.number,
  relayers: PropTypes.arrayOf(relayersPropTypes.relayer).isRequired,
  statsPeriod: sharedPropTypes.timePeriod.isRequired,
};

RelayerList.defaultProps = {
  positionOffset: 0,
};

export default RelayerList;
