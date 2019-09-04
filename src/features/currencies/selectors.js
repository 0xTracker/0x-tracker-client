const getDisplayCurrency = state => state.preferences.currency;
const getRates = state => state.rates || undefined;

export { getDisplayCurrency, getRates };
