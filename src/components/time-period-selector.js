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

const TimePeriodSelector = ({ className, onChange, value }) => (
  <AsyncSelect
    className={className}
    controlShouldRenderValue
    isClearable={false}
    isSearchable={false}
    onChange={option => onChange(option.value)}
    options={OPTIONS}
    value={OPTIONS.find(option => option.value === value)}
  />
);

TimePeriodSelector.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

TimePeriodSelector.defaultProps = {
  className: undefined,
};

export default TimePeriodSelector;
