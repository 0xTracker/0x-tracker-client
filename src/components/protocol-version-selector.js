import PropTypes from 'prop-types';
import React from 'react';

import AsyncSelect from './async-select';

const OPTIONS = [
  { label: 'All', value: undefined },
  { label: 'v1', value: 1 },
  { label: 'v2', value: 2 },
  { label: 'v3', value: 3 },
];

const ProtocolVersionSelector = ({ className, name, onChange, value }) => (
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

ProtocolVersionSelector.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

ProtocolVersionSelector.defaultProps = {
  className: undefined,
  name: undefined,
};

export default ProtocolVersionSelector;
