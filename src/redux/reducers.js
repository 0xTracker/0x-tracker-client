import { createResponsiveStateReducer } from 'redux-responsive';

import metrics from '../features/metrics/reducer';

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
};

export default reducers;
