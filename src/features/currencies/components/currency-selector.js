import PropTypes from 'prop-types';
import React from 'react';

import { CURRENCIES } from '../constants';
import AsyncSelect from '../../../components/async-select';

const OPTIONS = CURRENCIES.map(currency => ({
  label: `${currency.name} (${currency.symbol})`,
  value: currency.symbol,
}));

const CurrencySelector = ({ className, defaultValue, name, onChange }) => (
  <AsyncSelect
    className={className}
    classNamePrefix={className}
    controlShouldRenderValue
    defaultValue={OPTIONS.find(option => option.value === defaultValue)}
    inputId={name}
    isClearable={false}
    isSearchable={false}
    name={name}
    onChange={option => onChange(option.value)}
    options={OPTIONS}
  />
);

CurrencySelector.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOf(Object.values(CURRENCIES)).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

CurrencySelector.defaultProps = {
  className: undefined,
};

export default CurrencySelector;
