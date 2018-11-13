import _ from 'lodash';
import { createSelector } from 'reselect';

import getRelayers from './get-relayers';

const getSlug = (state, { relayerSlug }) => relayerSlug;

export default createSelector(
  [getRelayers, getSlug],
  (relayers, slug) => _.find(relayers, { slug }),
);
