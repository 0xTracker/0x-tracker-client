import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD } from '../constants';
import Select from './select';

const OPTIONS = [
  { label: 'Past 24 hours', value: TIME_PERIOD.DAY },
  { label: 'Past week', value: TIME_PERIOD.WEEK },
  { label: 'Past month', value: TIME_PERIOD.MONTH },
  { label: 'Past year', value: TIME_PERIOD.YEAR },
  { label: 'All time', value: TIME_PERIOD.ALL },
];

const StyledSelect = styled(Select)`
  && .Select__control {
    display: none;
  }

  && .Select__menu {
    position: absolute;
    right: 0;
    width: 200px;
    z-index: 10;
  }
`;

const PopoutTimePeriodSelector = ({ className, name, onChange, value }) => (
  <StyledSelect
    autoFocus
    className={className}
    controlShouldRenderValue={false}
    hideSelectedOptions={false}
    isClearable={false}
    isSearchable={false}
    menuIsOpen
    name={name}
    onChange={(option) => onChange(option.value, name)}
    options={OPTIONS}
    value={OPTIONS.find((option) => option.value === value)}
  />
);

PopoutTimePeriodSelector.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

PopoutTimePeriodSelector.defaultProps = {
  className: undefined,
  name: undefined,
};

export default PopoutTimePeriodSelector;
