import {
  DISABLE_AUTO_RELOAD,
  ENABLE_AUTO_RELOAD,
  SET_CURRENCY,
} from './action-types';

const disableAutoReload = () => ({
  type: DISABLE_AUTO_RELOAD,
});

const enableAutoReload = () => ({
  type: ENABLE_AUTO_RELOAD,
});

const setCurrency = currency => ({
  type: SET_CURRENCY,
  currency,
});

export { disableAutoReload, enableAutoReload, setCurrency };
