import _ from 'lodash';
import { createSelector } from 'reselect';
import objectHash from 'object-hash';

import { getConversionRate, getDisplayCurrency } from '../currencies/selectors';
import { BASE_CURRENCY } from '../currencies/constants';

const getNetworkStats = createSelector(
  [
    getConversionRate,
    getDisplayCurrency,
    (state, props) => props.period,
    state => _.get(state, 'stats.network'),
  ],
  (conversionRate, displayCurrency, period, networkStats) => {
    const stats = _.get(networkStats, `${period}`);

    if (stats === undefined) {
      return undefined;
    }

    return {
      ...stats,
      fees: {
        ...stats.fees,
        [displayCurrency]: stats.fees[BASE_CURRENCY] * conversionRate,
      },
      volume: stats.volume * conversionRate,
    };
  },
);

const getTokensStats = (state, { period, relayerId }) => {
  const conversionRate = getConversionRate(state);
  const displayCurrency = getDisplayCurrency(state);
  const stats = _.get(
    state,
    `stats.tokens.${objectHash({ period, relayer: relayerId })}`,
  );

  if (_.some([stats, conversionRate], _.isUndefined)) {
    return undefined;
  }

  return _.map(stats, stat => ({
    ...stat,
    volume: {
      ...stat.volume,
      [displayCurrency]: stat.volume[BASE_CURRENCY] * conversionRate,
    },
  }));
};

export { getNetworkStats, getTokensStats };
