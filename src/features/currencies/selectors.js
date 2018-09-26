import { createSelector } from 'reselect';

import { BASE_CURRENCY } from './constants';

const getDisplayCurrency = state => state.preferences.currency;

const getConversionRate = createSelector(
  [getDisplayCurrency, state => state.rates],
  (displayCurrency, rates) => {
    if (displayCurrency === BASE_CURRENCY) {
      return 1;
    }

    if (rates === null) {
      return null;
    }

    return rates[displayCurrency];
  },
);

export { getDisplayCurrency, getConversionRate };
