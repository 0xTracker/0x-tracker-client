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

      dispatch.metrics.update({ filter, metricType, metrics, period });
    },
  }),
  reducers: {
    update(state, { metricType, period, filter, metrics }) {
      const key = objectHash({ filter, metricType, period });

      return { ...state, [key]: metrics };
    },
  },
  state: {},
};

export default metricsModel;
