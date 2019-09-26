import PropTypes from 'prop-types';
import React from 'react';

import { TOKEN_TYPE } from '../constants';
import Select from '../../../components/select';

const OPTIONS = [
  { label: 'All', value: undefined },
  { label: 'ERC-20', value: TOKEN_TYPE.ERC20 },
  { label: 'ERC-721', value: TOKEN_TYPE.ERC721 },
];

const TokenTypeSelector = ({ className, name, onChange, value }) => (
  <Select
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

TokenTypeSelector.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

TokenTypeSelector.defaultProps = {
  className: undefined,
  value: undefined,
};

export default TokenTypeSelector;
