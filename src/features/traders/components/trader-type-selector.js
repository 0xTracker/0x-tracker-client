import PropTypes from 'prop-types';
import React from 'react';

import { TRADER_TYPE } from '../constants';
import Select from '../../../components/select';

const OPTIONS = [
  { label: 'All', value: undefined },
  { label: 'Makers', value: TRADER_TYPE.MAKER },
  { label: 'Takers', value: TRADER_TYPE.TAKER },
];

const TraderTypeSelector = ({ className, name, onChange, value }) => (
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

TraderTypeSelector.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

TraderTypeSelector.defaultProps = {
  className: undefined,
  value: undefined,
};

export default TraderTypeSelector;
