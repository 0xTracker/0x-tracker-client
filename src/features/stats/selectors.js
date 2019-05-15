import _ from 'lodash';
import objectHash from 'object-hash';

const getTokensStats = (state, { period, relayerId }) => {
  const stats = _.get(
    state,
    `stats.tokens.${objectHash({ period, relayer: relayerId })}`,
  );

  return stats;
};

export { getTokensStats };
