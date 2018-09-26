import Immutable from 'seamless-immutable';
import objectHash from 'object-hash';

import { FETCH_METRICS_SUCCESS, FETCH_TOKEN_VOLUME_SUCCESS } from './actions';
import { METRIC_TYPE } from './constants';

const initialState = {};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_METRICS_SUCCESS:
      return Immutable.set(
        state,
        objectHash({
          metricType: action.metricType,
          period: action.period,
          filter: action.filter,
        }),
        action.metrics,
      );
    case FETCH_TOKEN_VOLUME_SUCCESS:
      return Immutable.set(
        state,
        objectHash({
          period: action.period,
          token: action.token,
          metricType: METRIC_TYPE.TOKEN_VOLUME,
        }),
        action.metrics,
      );
    default:
      return state;
  }
};

export default reducer;
