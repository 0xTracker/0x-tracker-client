import _ from 'lodash';
import PropTypes from 'prop-types';

import { METRIC_GRANULARITY, TIME_PERIOD } from './constants';

const propTypes = {
  granularity: PropTypes.oneOf(_.values(METRIC_GRANULARITY)),
  timePeriod: PropTypes.oneOf(_.values(TIME_PERIOD)),
};

export default propTypes;
