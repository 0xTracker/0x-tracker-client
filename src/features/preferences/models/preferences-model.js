import { BASE_CURRENCY } from '../../currencies/constants';

const preferencesModel = {
  reducers: {
    disableAutoReload(state) {
      return {
        ...state,
        autoReload: {
          enabled: false,
        },
      };
    },
    enableAutoReload(state) {
      return {
        ...state,
        autoReload: {
          enabled: true,
        },
      };
    },
    setCurrency(state, currency) {
      return { ...state, currency };
    },
  },
  state: {
    autoReload: {
      enabled: true,
    },
    currency: BASE_CURRENCY,
  },
};

export default preferencesModel;
