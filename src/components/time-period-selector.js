import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../constants';
import Select from './select';

const OPTIONS = [
  { label: 'Past 24 hours', value: TIME_PERIOD.DAY },
  { label: 'Past week', value: TIME_PERIOD.WEEK },
  { label: 'Past 30 days', value: TIME_PERIOD.MONTH },
  { label: 'Past year', value: TIME_PERIOD.YEAR },
  { label: 'All time', value: TIME_PERIOD.ALL },
];

const TimePeriodSelector = ({
  disableExpensive,
  name,
  onChange,
  value,
  ...otherProps
}) => (
  <Select
    controlShouldRenderValue
    isClearable={false}
    isSearchable={false}
    name={name}
    onChange={(option) => onChange(option.value, name)}
    options={OPTIONS.filter(
      (o) => !disableExpensive || (o.value !== 'all' && o.value !== 'year'),
    )}
    value={OPTIONS.find((option) => option.value === value)}
    {...otherProps}
  />
);

TimePeriodSelector.propTypes = {
  disableExpensive: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

TimePeriodSelector.defaultProps = {
  disableExpensive: undefined,
  name: undefined,
};

export default TimePeriodSelector;
