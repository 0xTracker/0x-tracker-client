import { BASE_CURRENCY } from '../../currencies/constants';

const preferencesModel = {
  reducers: {
    setCurrency(state, currency) {
      return { ...state, currency };
    },
  },
  state: {
    currency: BASE_CURRENCY,
  },
};

export default preferencesModel;
