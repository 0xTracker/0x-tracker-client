import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../constants';
import AsyncSelect from './async-select';

const OPTIONS = [
  { label: 'Last 24 hours', value: TIME_PERIOD.DAY },
  { label: 'Last 7 days', value: TIME_PERIOD.WEEK },
  { label: 'The last month', value: TIME_PERIOD.MONTH },
  { label: 'The last year', value: TIME_PERIOD.YEAR },
  { label: 'All time', value: TIME_PERIOD.ALL },
];

const TimePeriodSelector = ({ className, name, onChange, value }) => (
  <AsyncSelect
    className={className}
    controlShouldRenderValue
    isClearable={false}
    isSearchable={false}
    name={name}
    onChange={option => onChange(option.value, name)}
    options={OPTIONS}
    value={OPTIONS.find(option => option.value === value)}
  />
);

TimePeriodSelector.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

TimePeriodSelector.defaultProps = {
  className: undefined,
  name: undefined,
};

export default TimePeriodSelector;
