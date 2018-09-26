import Immutable from 'seamless-immutable';

import { BASE_CURRENCY } from '../currencies/constants';
import {
  DISABLE_AUTO_RELOAD,
  ENABLE_AUTO_RELOAD,
  SET_CURRENCY,
} from './action-types';

const initialState = {
  autoReload: {
    enabled: true,
  },
  currency: BASE_CURRENCY,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DISABLE_AUTO_RELOAD:
      return Immutable.setIn(state, ['autoReload', 'enabled'], false);
    case ENABLE_AUTO_RELOAD:
      return Immutable.setIn(state, ['autoReload', 'enabled'], true);
    case SET_CURRENCY:
      return Immutable.set(state, 'currency', action.currency);
    default:
      return state;
  }
};

export default reducer;
