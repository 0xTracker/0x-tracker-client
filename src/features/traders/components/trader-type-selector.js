import PropTypes from 'prop-types';
import React from 'react';

import { TRADER_TYPE } from '../constants';
import Select from '../../../components/select';

const OPTIONS = [
  { label: 'All', value: null },
  { label: 'Makers', value: TRADER_TYPE.MAKER },
  { label: 'Takers', value: TRADER_TYPE.TAKER },
];

const TraderTypeSelector = ({ className, defaultValue, name, onChange }) => (
  <Select
    className={className}
    controlShouldRenderValue
    defaultValue={OPTIONS.find(option => option.value === defaultValue)}
    isClearable={false}
    isSearchable={false}
    name={name}
    onChange={option => onChange(option.value, name)}
    options={OPTIONS}
  />
);

TraderTypeSelector.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TraderTypeSelector.defaultProps = {
  className: undefined,
  defaultValue: undefined,
};

export default TraderTypeSelector;
