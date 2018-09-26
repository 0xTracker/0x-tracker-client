import Immutable from 'seamless-immutable';

import { FETCH_ZRX_PRICE_SUCCEEDED } from '../actions';

const initialState = {};

const zrxPrice = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ZRX_PRICE_SUCCEEDED:
      return Immutable.set(state, action.currency, action.price);
    default:
      return state;
  }
};

export default zrxPrice;
