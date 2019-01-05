import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import { colors } from '../../../styles/constants';
import Link from '../../../components/link';
import prettyPeriod from '../../../util/pretty-period';
import relayersPropTypes from '../prop-types';
import RelayerImage from './relayer-image';
import RelayerVolumeLabel from './relayer-volume-label';
import sharedPropTypes from '../../../prop-types';
import RelayerLink from './relayer-link';

const RelayerList = ({ relayers, timePeriod }) => {
  const sortedRelayers = _.orderBy(
    relayers,
    [`stats.volume.${BASE_CURRENCY}`, 'stats.trades'],
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
        {sortedRelayers.map((relayer, index) => (
          <tr
            className={classNames({
              faded: relayer.stats.trades === 0,
            })}
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
              {relayer.stats.trades === 0 ? '-' : relayer.stats.trades}
            </td>
            <td className="align-middle text-right">
              <RelayerVolumeLabel relayer={relayer} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

RelayerList.propTypes = {
  relayers: PropTypes.arrayOf(relayersPropTypes.relayerWithStats).isRequired,
  timePeriod: sharedPropTypes.timePeriod.isRequired,
};

export default RelayerList;
