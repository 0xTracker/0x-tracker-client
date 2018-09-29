import { createResponsiveStateReducer } from 'redux-responsive';

import metrics from '../features/metrics/reducer';
import stats from '../features/stats/reducer';

const reducers = {
  metrics,
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
};

export default reducers;
