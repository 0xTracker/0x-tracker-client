import { createResponsiveStateReducer } from 'redux-responsive';

const reducers = {
  screen: createResponsiveStateReducer(
    {
      xs: 575,
      sm: 767,
      md: 991,
      lg: 1199,
    },
    { infinity: 'xl' },
  ),
};

export default reducers;
