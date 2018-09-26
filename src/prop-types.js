import _ from 'lodash';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from './constants';

const propTypes = {
  timePeriod: PropTypes.oneOf(_.values(TIME_PERIOD)),
};

export default propTypes;
