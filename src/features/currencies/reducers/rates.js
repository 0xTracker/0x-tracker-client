import { FETCH_RATES_SUCCEEDED } from '../actions';

const rates = (state = null, action = {}) => {
  switch (action.type) {
    case FETCH_RATES_SUCCEEDED:
      return action.rates;
    default:
      return state;
  }
};

export default rates;
