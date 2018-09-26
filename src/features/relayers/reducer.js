import _ from 'lodash';

import { FETCH_RELAYERS_SUCCEEDED } from './actions';

const reducer = (state = null, action = {}) => {
  switch (action.type) {
    case FETCH_RELAYERS_SUCCEEDED:
      return _.keyBy(action.relayers, 'id');
    default:
      return state;
  }
};

export default reducer;
