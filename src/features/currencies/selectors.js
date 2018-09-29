import { createSelector } from 'reselect';

import { BASE_CURRENCY } from './constants';

const getDisplayCurrency = state => state.preferences.currency;
const getRates = state => state.rates || undefined;

const getConversionRate = createSelector(
  [getDisplayCurrency, getRates],
  (displayCurrency, rates) => {
    if (displayCurrency === BASE_CURRENCY) {
      return 1;
    }

    if (rates === undefined) {
      return undefined;
    }

    return rates[displayCurrency];
  },
);

export { getDisplayCurrency, getConversionRate, getRates };
