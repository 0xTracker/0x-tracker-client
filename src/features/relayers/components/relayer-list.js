import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@tippyjs/react';

import { colors } from '../../../styles/constants';
import { HelpIcon } from '../../../components/icons';
import Link from '../../../components/link';
import MiniRelayerMetrics from '../../metrics/components/mini-relayer-metrics';
import Number from '../../../components/number';
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
        <th>#</th>
        <th colSpan="2">Relayer</th>
        <th className="text-right">Trades</th>
        <th className="text-right">Volume</th>
        <th className="text-right">Volume Graph</th>
      </tr>
    </thead>
    <tbody>
      {relayers.map((relayer, index) => (
        <tr key={relayer.id}>
          <td className="align-middle">{`${positionOffset + index + 1}`}</td>
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
                <Tooltip content="'0x API' trades include fills of orders posted to https://api.0x.org/sra as well as orders filled through https://api.0x.org/swap/quote that point to other DEX protocols like Uniswap and Kyber.">
                  <HelpIcon
                    css="margin-left: 0.5rem; vertical-align: middle;"
                    height={18}
                    width={18}
                  />
                </Tooltip>
              )}
              {relayer.id === 'unknown' && (
                <Tooltip content="Unknown relayer volume includes all trades that don't belong to known relayers. These trades could be over the counter (OTC) or belong to relayers which 0x Tracker is not yet indexing.">
                  <HelpIcon
                    css="margin-left: 0.5rem; vertical-align: middle;"
                    height={18}
                    width={18}
                  />
                </Tooltip>
              )}
            </span>
            {relayer.url ? (
              <Link
                css={`
                  color: ${colors.stormGray};
                  font-size: 0.9rem;
                `}
                href={relayer.url}
              >
                {relayer.url}
              </Link>
            ) : null}
          </td>
          <td className="align-middle text-right">
            <Number>{relayer.stats.tradeCount}</Number>
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
