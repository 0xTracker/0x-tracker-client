const FETCH_NETWORK_STATS = 'FETCH_NETWORK_STATS';
const FETCH_NETWORK_STATS_SUCCEEDED = 'FETCH_NETWORK_STATS_SUCCEEDED';

const FETCH_RELAYER_STATS = 'FETCH_RELAYER_STATS';
const FETCH_RELAYER_STATS_SUCCEEDED = 'FETCH_RELAYER_STATS_SUCCEEDED';

const FETCH_TOKEN_STATS = 'FETCH_TOKEN_STATS';
const FETCH_TOKEN_STATS_SUCCEEDED = 'FETCH_TOKEN_STATS_SUCCEEDED';

const fetchNetworkStats = period => ({
  period,
  type: FETCH_NETWORK_STATS,
});

const fetchRelayerStats = period => ({
  period,
  type: FETCH_RELAYER_STATS,
});

const fetchTokenStats = (period, filter = {}) => ({
  relayerId: filter.relayerId,
  period,
  type: FETCH_TOKEN_STATS,
});

export {
  fetchNetworkStats,
  fetchRelayerStats,
  fetchTokenStats,
  FETCH_NETWORK_STATS,
  FETCH_NETWORK_STATS_SUCCEEDED,
  FETCH_RELAYER_STATS,
  FETCH_RELAYER_STATS_SUCCEEDED,
  FETCH_TOKEN_STATS,
  FETCH_TOKEN_STATS_SUCCEEDED,
};
