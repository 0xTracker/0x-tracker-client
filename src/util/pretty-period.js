import _ from 'lodash';

import normalizePeriod from './normalize-period';

const prettyPeriod = (period) => _.toUpper(normalizePeriod(period));

export default prettyPeriod;
