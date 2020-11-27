import PropTypes from 'prop-types';
import React from 'react';

import { METRIC_GRANULARITY } from '../constants';
import DropdownPill from './dropdown-pill';
import getGranularityOptions from '../util/get-granularity-options';
import sharedPropTypes from '../prop-types';

const GRANULARITY_LABELS = {
  [METRIC_GRANULARITY.HOUR]: '1h',
  [METRIC_GRANULARITY.DAY]: '1d',
  [METRIC_GRANULARITY.WEEK]: '1w',
  [METRIC_GRANULARITY.MONTH]: '1m',
};

const GranularityPill = ({ onChange, period, value }) => {
  const validGranularities = getGranularityOptions(period);
  const options = validGranularities.map((x) => ({
    label: GRANULARITY_LABELS[x],
    value: x,
  }));

  return <DropdownPill onChange={onChange} options={options} value={value} />;
};

GranularityPill.propTypes = {
  onChange: PropTypes.func.isRequired,
  period: sharedPropTypes.timePeriod.isRequired,
  value: sharedPropTypes.granularity.isRequired,
};

export default GranularityPill;
