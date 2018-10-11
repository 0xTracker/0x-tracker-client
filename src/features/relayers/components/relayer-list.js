import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import buildRelayerUrl from '../util/build-relayer-url';
import Link from '../../../components/link';
import prettyPeriod from '../../../util/pretty-period';
import relayersPropTypes from '../prop-types';
import RelayerVolumeLabel from './relayer-volume-label';
import sharedPropTypes from '../../../prop-types';

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
          <th>Name</th>
          <th>Website</th>
          <th className="text-right">Trades ({prettyPeriod(timePeriod)})</th>
          <th className="text-right">Volume ({prettyPeriod(timePeriod)})</th>
        </tr>
      </thead>
      <tbody>
        {sortedRelayers.map((relayer, index) => (
          <tr
            className={classNames({
              'text-muted': relayer.stats.trades === 0,
            })}
            key={relayer.id}
          >
            <td>{`${index + 1}`}</td>
            <td width="50%">
              <Link href={buildRelayerUrl(relayer)}>{relayer.name}</Link>
            </td>
            <td width="49%">
              <Link href={relayer.url}>{relayer.url}</Link>
            </td>
            <td className="text-right">
              {relayer.stats.trades === 0 ? '-' : relayer.stats.trades}
            </td>
            <td className="text-right">
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
