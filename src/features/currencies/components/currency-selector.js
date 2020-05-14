import PropTypes from 'prop-types';
import React from 'react';

import { CURRENCIES } from '../constants';
import currenciesPropTypes from '../prop-types';
import Select from '../../../components/select';

const OPTIONS = CURRENCIES.map((currency) => ({
  label: `${currency.name} (${currency.symbol})`,
  value: currency.symbol,
}));

const CurrencySelector = ({ className, name, onChange, value }) => (
  <Select
    className={className}
    controlShouldRenderValue
    inputId={name}
    isClearable={false}
    isSearchable={false}
    name={name}
    onChange={(option) => onChange(option.value)}
    options={OPTIONS}
    value={OPTIONS.find((option) => option.value === value)}
  />
);

CurrencySelector.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: currenciesPropTypes.currency.isRequired,
};

CurrencySelector.defaultProps = {
  className: undefined,
};

export default CurrencySelector;
