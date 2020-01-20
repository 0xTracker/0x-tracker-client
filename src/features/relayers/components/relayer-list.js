import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import Link from '../../../components/link';
import Number from '../../../components/number';
import relayersPropTypes from '../prop-types';
import RelayerImage from './relayer-image';
import RelayerVolumeLabel from './relayer-volume-label';
import RelayerLink from './relayer-link';

const RelayerList = ({ positionOffset, relayers }) => (
  <table className="table table-responsive">
    <thead>
      <tr>
        <th>#</th>
        <th colSpan="2">Relayer</th>
        <th className="text-right">Trades</th>
        <th className="text-right">Volume</th>
      </tr>
    </thead>
    <tbody>
      {relayers.map((relayer, index) => (
        <tr key={relayer.id}>
          <td className="align-middle">{`${positionOffset + index + 1}`}</td>
          <td className="align-middle">
            <RelayerLink relayer={relayer.slug}>
              <RelayerImage imageUrl={relayer.imageUrl} />
            </RelayerLink>
          </td>
          <td className="align-middle" width="99%">
            <RelayerLink relayer={relayer.slug}>{relayer.name}</RelayerLink>
            {relayer.url ? (
              <>
                <br />
                <Link
                  css={`
                    color: ${colors.stormGray};
                    font-size: 0.9rem;
                  `}
                  href={relayer.url}
                >
                  {relayer.url}
                </Link>
              </>
            ) : null}
          </td>
          <td className="align-middle text-right">
            <Number>{relayer.stats.tradeCount}</Number>
          </td>
          <td className="align-middle text-right">
            <RelayerVolumeLabel stats={relayer.stats} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

RelayerList.propTypes = {
  positionOffset: PropTypes.number,
  relayers: PropTypes.arrayOf(relayersPropTypes.relayer).isRequired,
};

RelayerList.defaultProps = {
  positionOffset: 0,
};

export default RelayerList;
