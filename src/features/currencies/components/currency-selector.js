import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

import { CURRENCIES } from '../constants';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const OPTIONS = CURRENCIES.map(currency => ({
  label: `${currency.name} (${currency.symbol})`,
  value: currency.symbol,
}));

const CurrencySelector = ({ className, name, onChange }) => {
  const displayCurrency = useDisplayCurrency();

  const handleChange = option => onChange(option.value);

  return (
    <Select
      className={className}
      classNamePrefix={className}
      controlShouldRenderValue
      defaultValue={OPTIONS.find(option => option.value === displayCurrency)}
      inputId={name}
      isClearable={false}
      isSearchable={false}
      name={name}
      onChange={handleChange}
      options={OPTIONS}
    />
  );
};

CurrencySelector.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

CurrencySelector.defaultProps = {
  className: undefined,
};

export default CurrencySelector;
