import _ from 'lodash';

import callApi from '../../../util/call-api';

const tokensModel = {
  effects: dispatch => ({
    async fetch() {
      const tokens = await callApi('tokens');

      dispatch.tokens.update(tokens);
    },
  }),
  reducers: {
    update(state, tokens) {
      return _.keyBy(tokens, 'address');
    },
  },
  state: null,
};

export default tokensModel;
