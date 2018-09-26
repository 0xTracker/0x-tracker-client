import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_TOKENS, FETCH_TOKENS_SUCCEEDED } from './actions';
import callApi from '../../util/call-api';

function* fetchTokens() {
  const tokens = yield callApi('tokens');

  yield put({ type: FETCH_TOKENS_SUCCEEDED, tokens });
}

function* saga() {
  yield takeLatest(FETCH_TOKENS, fetchTokens);
}

export default saga;
