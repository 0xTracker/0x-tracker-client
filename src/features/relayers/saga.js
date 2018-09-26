import { put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_RELAYERS,
  FETCH_RELAYERS_FAILED,
  FETCH_RELAYERS_SUCCEEDED,
} from './actions';
import callApi from '../../util/call-api';

function* fetchRelayers() {
  try {
    const relayers = yield callApi('relayers');

    yield put({ type: FETCH_RELAYERS_SUCCEEDED, relayers });
  } catch (e) {
    yield put({ type: FETCH_RELAYERS_FAILED, message: e.message });
  }
}

function* saga() {
  yield takeLatest(FETCH_RELAYERS, fetchRelayers);
}

export default saga;
