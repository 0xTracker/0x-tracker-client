import _ from 'lodash';
import { createSelector } from 'reselect';

import { BASE_CURRENCY } from '../../currencies/constants';
import { getRelayersStats } from '../../stats/selectors';

const getRelayersWithStats = createSelector(
  [getRelayersStats, state => state.relayers],
  (stats, relayers) => {
    if (_.some([stats, relayers], _.isNil)) {
      return undefined;
    }

    const totalVolume = _.sumBy(_.values(stats), `volume.${BASE_CURRENCY}`);

    return _.map(stats, stat => ({
      ...relayers[stat.relayer],
      stats: {
        ..._.pick(stat, 'fees', 'trades', 'volume'),
        share: (stat.volume[BASE_CURRENCY] / totalVolume) * 100,
      },
    }));
  },
);

export default getRelayersWithStats;
