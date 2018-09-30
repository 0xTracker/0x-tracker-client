import _ from 'lodash';

import callApi from '../../../util/call-api';

const relayersModel = {
  effects: dispatch => ({
    async fetch() {
      const relayers = await callApi('relayers');

      dispatch.relayers.update(relayers);
    },
  }),
  reducers: {
    update(state, relayers) {
      return _.keyBy(relayers, 'id');
    },
  },
  state: null,
};

export default relayersModel;
