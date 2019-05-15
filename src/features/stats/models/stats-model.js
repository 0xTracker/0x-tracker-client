import objectHash from 'object-hash';

import callApi from '../../../util/call-api';

const statsModel = {
  effects: dispatch => ({
    async fetchTokenStats({ period, relayer }) {
      const params = { period, relayer };
      const stats = await callApi('stats/tokens', params);

      dispatch.stats.updateTokenStats({ period, relayer, stats });
    },
  }),
  reducers: {
    updateTokenStats(state, { stats, period, relayer }) {
      const key = objectHash({ period, relayer });

      return { ...state, tokens: { ...state.tokens, [key]: stats } };
    },
  },
  state: {},
};

export default statsModel;
