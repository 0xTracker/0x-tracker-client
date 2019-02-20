import { createResponsiveStateReducer } from 'redux-responsive';

const reducers = {
  screen: createResponsiveStateReducer(
    {
      xs: 575,
      md: 991, // eslint-disable-line sort-keys
      sm: 767,
      lg: 1199, // eslint-disable-line sort-keys
    },
    { infinity: 'xl' },
  ),
};

export default reducers;
