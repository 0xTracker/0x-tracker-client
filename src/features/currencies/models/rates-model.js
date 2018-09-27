import { flow, map, join } from 'lodash/fp';
import axios from 'axios';

import { CURRENCIES, BASE_CURRENCY } from '../constants';

const ratesModel = {
  effects: dispatch => ({
    async fetch() {
      const toSymbols = flow([map(currency => currency.symbol), join(',')])(
        CURRENCIES,
      );

      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${BASE_CURRENCY}&tsyms=${toSymbols}`,
      );
      const rates = response.data[BASE_CURRENCY];

      dispatch.rates.update(rates);
    },
  }),
  reducers: {
    update(state, payload) {
      return payload;
    },
  },
  state: null,
};

export default ratesModel;
