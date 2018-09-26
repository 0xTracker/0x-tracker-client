import _ from 'lodash';

import { FETCH_TOKENS_SUCCEEDED } from './actions';

const reducer = (state = null, action = {}) => {
  switch (action.type) {
    case FETCH_TOKENS_SUCCEEDED:
      return _.keyBy(action.tokens, 'address');
    default:
      return state;
  }
};

export default reducer;
