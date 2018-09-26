import { put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_NETWORK_STATS,
  FETCH_NETWORK_STATS_SUCCEEDED,
  FETCH_RELAYER_STATS,
  FETCH_RELAYER_STATS_SUCCEEDED,
  FETCH_TOKEN_STATS,
  FETCH_TOKEN_STATS_SUCCEEDED,
} from './actions';
import callApi from '../../util/call-api';

function* fetchNetworkStats(action) {
  const { period } = action;
  const params = { period };
  const stats = yield callApi('stats/network', params);

  yield put({ type: FETCH_NETWORK_STATS_SUCCEEDED, stats, period });
}

function* fetchRelayerStats(action) {
  const { period } = action;
  const params = { period };
  const stats = yield callApi('stats/relayers', params);

  yield put({ type: FETCH_RELAYER_STATS_SUCCEEDED, stats, period });
}

function* fetchTokenStats(action) {
  const { period, relayerId } = action;
  const params = { period, relayer: relayerId };
  const stats = yield callApi('stats/tokens', params);

  yield put({
    type: FETCH_TOKEN_STATS_SUCCEEDED,
    stats,
    period,
    relayerId,
  });
}

function* saga() {
  yield takeLatest(FETCH_RELAYER_STATS, fetchRelayerStats);
  yield takeLatest(FETCH_NETWORK_STATS, fetchNetworkStats);
  yield takeLatest(FETCH_TOKEN_STATS, fetchTokenStats);
}

export default saga;
