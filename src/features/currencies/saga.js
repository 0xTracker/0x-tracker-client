import { put, takeLatest } from 'redux-saga/effects';
import {
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

function* saga() {
  yield takeLatest(FETCH_ZRX_PRICE, fetchZrxPrice);
}

export default saga;
