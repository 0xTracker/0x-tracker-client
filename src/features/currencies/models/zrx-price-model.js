import { getDisplayCurrency } from '../selectors';
import callApi from '../../../util/call-api';

const zrxPriceModel = {
  effects: dispatch => ({
    async fetch(payload, rootState) {
      const displayCurrency = getDisplayCurrency(rootState);
      const price = await callApi('zrx-price', { currency: displayCurrency });

      dispatch.zrxPrice.update({ currency: displayCurrency, price });
    },
  }),
  reducers: {
    update(state, { currency, price }) {
      return { ...state, [currency]: price };
    },
  },
  state: {},
};

export default zrxPriceModel;
