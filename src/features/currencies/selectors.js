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
      return undefined;
    }

    return rates[displayCurrency];
  },
);

const getRates = state => state.rates || undefined;

export { getDisplayCurrency, getConversionRate, getRates };
