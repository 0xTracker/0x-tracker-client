import _ from 'lodash';
import { flow, map, orderBy } from 'lodash/fp';
import { createSelector } from 'reselect';

import { BASE_CURRENCY } from '../../currencies/constants';
import { getTokensStats } from '../../stats/selectors';
import getTokens from './get-tokens';

const getTokensWithStats = createSelector(
  getTokens,
  getTokensStats,
  (tokens, stats) => {
    if (_.some([tokens, stats], _.isUndefined)) {
      return undefined;
    }

    const totalVolume = _.sumBy(_.values(stats), `volume.${BASE_CURRENCY}`);
    const tokensWithStats = flow([
      map(token => {
        const stat = _.find(stats, { token: token.address }) || {
          trades: 0,
          volume: { [BASE_CURRENCY]: 0, [token.symbol]: 0 },
        };

        return {
          ...token,
          ...stat,
          share: (stat.volume[BASE_CURRENCY] / totalVolume) * 100,
          volume: {
            [BASE_CURRENCY]: stat.volume[BASE_CURRENCY],
            [token.symbol]: stat.volume[token.symbol],
          },
        };
      }),
      orderBy(
        [
          `volume.${BASE_CURRENCY}`,
          token => _.toNumber(token.volume[token.symbol]),
          'symbol',
        ],
        ['desc', 'desc', 'asc'],
      ),
    ])(tokens);

    return tokensWithStats;
  },
);

export default getTokensWithStats;
