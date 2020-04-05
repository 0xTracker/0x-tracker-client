import PropTypes from 'prop-types';
import React from 'react';

import AsyncSelect from '../../../components/async-select';

const OPTIONS = [
  { label: 'All', value: undefined },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
  { label: 'Successful', value: 'successful' },
];

const FillStatusSelector = ({ className, name, onChange, value }) => (
  <AsyncSelect
    className={className}
    controlShouldRenderValue
    isClearable={false}
    isSearchable={false}
    name={name}
    onChange={(option) => onChange(option.value, name)}
    options={OPTIONS}
    value={OPTIONS.find((option) => option.value === value)}
  />
);

FillStatusSelector.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

FillStatusSelector.defaultProps = {
  className: undefined,
  name: undefined,
  value: undefined,
};

export default FillStatusSelector;
