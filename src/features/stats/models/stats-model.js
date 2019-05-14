import objectHash from 'object-hash';

import callApi from '../../../util/call-api';

const statsModel = {
  effects: dispatch => ({
    async fetchNetworkStats({ period }) {
      const params = { period };
      const stats = await callApi('stats/network', params);

      dispatch.stats.updateNetworkStats({ period, stats });
    },
    async fetchTokenStats({ period, relayer }) {
      const params = { period, relayer };
      const stats = await callApi('stats/tokens', params);

      dispatch.stats.updateTokenStats({ period, relayer, stats });
    },
  }),
  reducers: {
    updateNetworkStats(state, { stats, period }) {
      return { ...state, network: { ...state.network, [period]: stats } };
    },
    updateTokenStats(state, { stats, period, relayer }) {
      const key = objectHash({ period, relayer });

      return { ...state, tokens: { ...state.tokens, [key]: stats } };
    },
  },
  state: {},
};

export default statsModel;
