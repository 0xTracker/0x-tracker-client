import _ from 'lodash';
import { createSelector } from 'reselect';

const getIsMobile = createSelector(
  [state => state.screen],
  screen =>
    _.get(screen, 'lessThan.small', false) || _.get(screen, 'is.small', false),
);

export default getIsMobile;
