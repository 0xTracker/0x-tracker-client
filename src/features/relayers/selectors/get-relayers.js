import _ from 'lodash';
import { createSelector } from 'reselect';

export default createSelector(
  state => state.relayers,
  relayers => (relayers === null ? undefined : _.values(relayers)),
);
