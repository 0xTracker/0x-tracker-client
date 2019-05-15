import _ from 'lodash';
import { createSelector } from 'reselect';
import objectHash from 'object-hash';

const getNetworkStats = createSelector(
  [(state, props) => props.period, state => _.get(state, 'stats.network')],
  (period, networkStats) => {
    const stats = _.get(networkStats, `${period}`);

    return stats;
  },
);

const getTokensStats = (state, { period, relayerId }) => {
  const stats = _.get(
    state,
    `stats.tokens.${objectHash({ period, relayer: relayerId })}`,
  );

  return stats;
};

export { getNetworkStats, getTokensStats };
