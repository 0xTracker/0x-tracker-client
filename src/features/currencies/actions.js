export const FETCH_ZRX_PRICE = 'FETCH_ZRX_PRICE';
export const FETCH_ZRX_PRICE_FAILED = 'FETCH_ZRX_PRICE_FAILED';
export const FETCH_ZRX_PRICE_SUCCEEDED = 'FETCH_ZRX_PRICE_SUCCEEDED';

export const FETCH_RATES = 'FETCH_RATES';
export const FETCH_RATES_SUCCEEDED = 'FETCH_RATES_SUCCEEDED';
export const FETCH_RATES_FAILED = 'FETCH_RATES_FAILED';

export const fetchZrxPrice = currency => ({
  type: FETCH_ZRX_PRICE,
  currency,
});

export const fetchRates = () => ({
  type: FETCH_RATES,
});
