import { put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_METRICS,
  FETCH_METRICS_SUCCESS,
  FETCH_TOKEN_VOLUME,
  FETCH_TOKEN_VOLUME_SUCCESS,
} from './actions';
import callApi from '../../util/call-api';

function* fetchMetrics(action) {
  const { metricType, period, filter } = action;
  const params = {
    period,
    ...filter,
  };
  const metrics = yield callApi(`metrics/${metricType}`, params);

  yield put({
    type: FETCH_METRICS_SUCCESS,
    metrics,
    metricType,
    period,
    filter,
  });
}

function* fetchTokenVolume(action) {
  const { period, token } = action;
  const metrics = yield callApi('metrics/token-volume', {
    period,
    token,
  });

  yield put({
    type: FETCH_TOKEN_VOLUME_SUCCESS,
    metrics: metrics.map(metric => ({
      ...metric,
      date: new Date(metric.date),
    })),
    period,
    token,
  });
}

function* saga() {
  yield takeLatest(FETCH_METRICS, fetchMetrics);
  yield takeLatest(FETCH_TOKEN_VOLUME, fetchTokenVolume);
}

export default saga;
