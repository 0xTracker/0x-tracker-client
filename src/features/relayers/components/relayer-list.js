import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import Link from '../../../components/link';
import normalizePeriod from '../../../util/normalize-period';
import prettyPeriod from '../../../util/pretty-period';
import relayersPropTypes from '../prop-types';
import RelayerImage from './relayer-image';
import RelayerVolumeLabel from './relayer-volume-label';
import sharedPropTypes from '../../../prop-types';
import RelayerLink from './relayer-link';

const RelayerList = ({ relayers, timePeriod }) => {
  const normalizedPeriod = normalizePeriod(timePeriod);
  const sortedRelayers = _.orderBy(
    relayers,
    [
      `stats["${normalizedPeriod}"].volume`,
      `stats["${normalizedPeriod}"].trades`,
    ],
    ['desc', 'desc'],
  );

  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th>#</th>
          <th colSpan="2">Relayer</th>
          <th className="text-right">Trades ({prettyPeriod(timePeriod)})</th>
          <th className="text-right">Volume ({prettyPeriod(timePeriod)})</th>
        </tr>
      </thead>
      <tbody>
        {sortedRelayers.map((relayer, index) => {
          const stats = _.get(relayer, `stats['${normalizedPeriod}']`, {});

          return (
            <tr
              className={stats.trades === 0 ? 'faded' : undefined}
              key={relayer.id}
            >
              <td className="align-middle">{`${index + 1}`}</td>
              <td className="align-middle">
                <RelayerLink relayer={relayer}>
                  <RelayerImage imageUrl={relayer.imageUrl} />
                </RelayerLink>
              </td>
              <td className="align-middle" width="99%">
                <RelayerLink relayer={relayer}>{relayer.name}</RelayerLink>
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
                {stats.trades === 0 ? '-' : stats.trades}
              </td>
              <td className="align-middle text-right">
                <RelayerVolumeLabel stats={stats} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

RelayerList.propTypes = {
  relayers: PropTypes.arrayOf(relayersPropTypes.relayer).isRequired,
  timePeriod: sharedPropTypes.timePeriod.isRequired,
};

export default RelayerList;
