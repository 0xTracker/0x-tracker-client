import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import HelpWidget from '../../../components/help-widget';
import Link from '../../../components/link';
import MiniRelayerMetrics from '../../metrics/components/mini-relayer-metrics';
import Number from '../../../components/number';
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
        <th colSpan="2">Relayer</th>
        <th className="text-right">
          Traders{' '}
          <HelpWidget css="margin-left: 0.25rem;">
            The number of unique maker/taker addresses for a given relayer in
            the selected period.
          </HelpWidget>
        </th>
        <th className="text-right">
          Trades
          <HelpWidget css="margin-left: 0.25rem;">
            The number of unique trades for a given relayer in the selected
            period.
          </HelpWidget>
        </th>
        <th className="text-right">
          Volume
          <HelpWidget css="margin-left: 0.25rem;">
            The total value of all trades for a given relayer in the selected
            period.
          </HelpWidget>
        </th>
        <th className="text-right">
          Volume Trend
          <HelpWidget css="margin-left: 0.25rem;">
            The trend of trading volume for a given relayer in the selected
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
            <span css="align-items: center; display: flex; font-weight: 500;">
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
                  Unknown relayer volume includes all trades that don&rsquo;t
                  belong to known relayers. These trades could be over the
                  counter (OTC) or belong to relayers which 0x Tracker is not
                  yet indexing.
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
              >
                {relayer.url}
              </Link>
            ) : null}
          </td>
          <td className="align-middle text-right">
            <Number summarize>{relayer.stats.traderCount}</Number>
          </td>
          <td className="align-middle text-right">
            <Number summarize>{relayer.stats.tradeCount}</Number>
          </td>
          <td className="align-middle text-right">
            <RelayerVolumeLabel stats={relayer.stats} />
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
