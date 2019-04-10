import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import { TIME_PERIOD } from '../../../constants';
import Link from '../../../components/link';
import prettyPeriod from '../../../util/pretty-period';
import relayersPropTypes from '../prop-types';
import RelayerImage from './relayer-image';
import RelayerVolumeLabel from './relayer-volume-label';
import sharedPropTypes from '../../../prop-types';
import RelayerLink from './relayer-link';

const TIME_PERIOD_MAPPING = {
  [TIME_PERIOD.DAY]: '24h',
  [TIME_PERIOD.WEEK]: '7d',
  [TIME_PERIOD.MONTH]: '1m',
};

const RelayerList = ({ relayers, timePeriod }) => {
  const mappedPeriod = TIME_PERIOD_MAPPING[timePeriod];
  const sortedRelayers = _.orderBy(
    relayers,
    [`stats["${mappedPeriod}"].volume`, `stats["${mappedPeriod}"].trades`],
    ['desc', 'desc'],
  );

  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th>#</th>
          <th colSpan="2">Relayer</th>
          <th className="text-right">Trades ({prettyPeriod(mappedPeriod)})</th>
          <th className="text-right">Volume ({prettyPeriod(mappedPeriod)})</th>
        </tr>
      </thead>
      <tbody>
        {sortedRelayers.map((relayer, index) => {
          const stats = _.get(relayer, `stats['${mappedPeriod}']`, {});

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
