import _ from 'lodash';
import Immutable from 'seamless-immutable';
import objectHash from 'object-hash';

import {
  FETCH_NETWORK_STATS_SUCCEEDED,
  FETCH_RELAYER_STATS_SUCCEEDED,
  FETCH_TOKEN_STATS_SUCCEEDED,
} from './actions';

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case FETCH_RELAYER_STATS_SUCCEEDED:
      return Immutable.setIn(
        state,
        ['relayers', action.period],
        _.keyBy(action.stats, 'relayer'),
      );
    case FETCH_NETWORK_STATS_SUCCEEDED:
      return Immutable.setIn(state, ['network', action.period], action.stats);

    case FETCH_TOKEN_STATS_SUCCEEDED:
      return Immutable.setIn(
        state,
        ['tokens', objectHash(_.pick(action, ['period', 'relayerId']))],
        action.stats,
      );
    default:
      return state;
  }
};

export default reducer;
