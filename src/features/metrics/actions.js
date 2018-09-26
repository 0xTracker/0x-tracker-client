const FETCH_METRICS = 'FETCH_METRICS';
const FETCH_METRICS_SUCCESS = 'FETCH_METRICS_SUCCESS';
const FETCH_TOKEN_VOLUME = 'FETCH_TOKEN_VOLUME';
const FETCH_TOKEN_VOLUME_SUCCESS = 'FETCH_TOKEN_VOLUME_SUCCESS';

const fetchMetrics = (metricType, period, filter = {}) => ({
  metricType,
  period,
  filter,
  type: FETCH_METRICS,
});

const fetchTokenVolume = (token, period) => ({
  period,
  token,
  type: FETCH_TOKEN_VOLUME,
});

export {
  FETCH_METRICS,
  FETCH_METRICS_SUCCESS,
  FETCH_TOKEN_VOLUME,
  FETCH_TOKEN_VOLUME_SUCCESS,
  fetchMetrics,
  fetchTokenVolume,
};
