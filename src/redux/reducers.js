import { createResponsiveStateReducer } from 'redux-responsive';

const reducers = {
  screen: createResponsiveStateReducer(
    {
      xs: 575,
      sm: 767, // eslint-disable-line sort-keys
      md: 991, // eslint-disable-line sort-keys
      lg: 1199, // eslint-disable-line sort-keys
    },
    { infinity: 'xl' },
  ),
};

export default reducers;
