import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../constants';
import Select from './select';

const OPTIONS = [
  { label: 'Last 24 hours', value: TIME_PERIOD.DAY },
  { label: 'Last 7 days', value: TIME_PERIOD.WEEK },
  { label: 'The last month', value: TIME_PERIOD.MONTH },
  { label: 'The last year', value: TIME_PERIOD.YEAR },
  { label: 'All time', value: TIME_PERIOD.ALL },
];

const TimePeriodSelector = ({ className, defaultValue, onChange }) => (
  <Select
    className={className}
    controlShouldRenderValue
    defaultValue={OPTIONS.find(option => option.value === defaultValue)}
    isClearable={false}
    isSearchable={false}
    onChange={option => onChange(option.value)}
    options={OPTIONS}
  />
);

TimePeriodSelector.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TimePeriodSelector.defaultProps = {
  className: undefined,
};

export default TimePeriodSelector;
