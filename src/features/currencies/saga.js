import { flow, join, map } from 'lodash/fp';
import axios from 'axios';

import { put, takeLatest } from 'redux-saga/effects';
import { BASE_CURRENCY, CURRENCIES } from './constants';
import {
  FETCH_RATES,
  FETCH_RATES_SUCCEEDED,
  FETCH_RATES_FAILED,
  FETCH_ZRX_PRICE,
  FETCH_ZRX_PRICE_SUCCEEDED,
  FETCH_ZRX_PRICE_FAILED,
} from './actions';
import callApi from '../../util/call-api';

function* fetchZrxPrice(action) {
  const { currency } = action;
  try {
    const price = yield callApi('zrx-price', { currency });

    yield put({ type: FETCH_ZRX_PRICE_SUCCEEDED, price, currency });
  } catch (e) {
    yield put({ type: FETCH_ZRX_PRICE_FAILED, message: e.message });
  }
}

// TODO: Add error handling
function* fetchRates() {
  const toSymbols = flow([map(currency => currency.symbol), join(',')])(
    CURRENCIES,
  );

  try {
    const response = yield axios.get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${BASE_CURRENCY}&tsyms=${toSymbols}`,
    );

    yield put({
      type: FETCH_RATES_SUCCEEDED,
      rates: response.data[BASE_CURRENCY],
    });
  } catch (e) {
    yield put({ type: FETCH_RATES_FAILED, message: e.message });
  }
}

function* saga() {
  yield takeLatest(FETCH_ZRX_PRICE, fetchZrxPrice);
  yield takeLatest(FETCH_RATES, fetchRates);
}

export default saga;
