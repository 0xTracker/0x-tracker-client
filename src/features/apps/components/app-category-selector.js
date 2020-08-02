import PropTypes from 'prop-types';
import React from 'react';

import Select from '../../../components/select';

const OPTIONS = [
  { label: 'All Categories', value: undefined },
  { label: 'API', value: 'api' },
  { label: 'DEX Aggregator', value: 'dex-aggregator' },
  { label: 'Exchange', value: 'exchange' },
  { label: 'Portfolio Manager', value: 'portfolio-manager' },
];

const AppCategorySelector = ({ className, name, onChange, value }) => (
  <Select
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

AppCategorySelector.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

AppCategorySelector.defaultProps = {
  className: undefined,
  value: undefined,
};

export default AppCategorySelector;
