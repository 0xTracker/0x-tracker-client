import objectHash from 'object-hash';

import callApi from '../../../util/call-api';

const metricsModel = {
  effects: dispatch => ({
    async fetch({ metricType, period, filter = {} }) {
      const params = {
        period,
        ...filter,
      };
      const metrics = await callApi(`metrics/${metricType}`, params);

      dispatch.metrics.update({ metricType, period, filter, metrics });
    },
  }),
  reducers: {
    update(state, { metricType, period, filter, metrics }) {
      const key = objectHash({ metricType, period, filter });

      return { ...state, [key]: metrics };
    },
  },
  state: {},
};

export default metricsModel;
