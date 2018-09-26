import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';

import autoReload from '../features/auto-reload/reducer';
import metrics from '../features/metrics/reducer';
import preferences from '../features/preferences/reducer';
import relayers from '../features/relayers/reducer';
import rates from '../features/currencies/reducers/rates';
import stats from '../features/stats/reducer';
import tokens from '../features/tokens/reducer';
import zrxPrice from '../features/currencies/reducers/zrx-price';

export default combineReducers({
  autoReload,
  metrics,
  preferences,
  rates,
  relayers,
  screen: createResponsiveStateReducer(
    {
      extraSmall: 575,
      small: 767,
      medium: 991,
      large: 1199,
    },
    { infinity: 'extraLarge' },
  ),
  stats,
  tokens,
  zrxPrice,
});
