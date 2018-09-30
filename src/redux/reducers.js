import { createResponsiveStateReducer } from 'redux-responsive';

const reducers = {
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
