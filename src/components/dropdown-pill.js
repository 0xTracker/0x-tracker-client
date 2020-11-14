import PropTypes from 'prop-types';
import React from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import { CaretDownIcon } from './icons';

const DropdownIndicator = () => <CaretDownIcon size={10} />;

const Dropdown = styled(ReactSelect).attrs({
  classNamePrefix: 'Select',
  components: {
    DropdownIndicator,
  },
  hideSelectedOptions: true,
  isClearable: false,
  isSearchable: false,
})`
  color: inherit;
  display: flex;
  height: 1.6rem;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 500;

  && .Select__control {
    background-color: ${COLORS.NEUTRAL.MYSTIC_400};
    border: none;
    border-radius: 0.25rem;
    min-height: initial;
    padding: 0 0.7rem;

    &:hover {
      background-color: ${COLORS.NEUTRAL.MYSTIC_500};
      color: currentColor;
      cursor: pointer;
      text-decoration: none;
    }
    &--menu-is-open {
      background-color: ${COLORS.NEUTRAL.MYSTIC_500};
    }
  }

  .Select__control--is-focused {
    box-shadow: none;
  }

  .Select__dropdown-indicator {
    color: ${COLORS.NEUTRAL.MYSTIC_500};
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__indicator {
    padding: 0;
  }

  && .Select__menu {
    background-color: ${COLORS.NEUTRAL.MYSTIC_100};
    border: 2px solid ${COLORS.NEUTRAL.MYSTIC_500};
    box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
    right: 0;
    width: initial;
  }

  && .Select__menu-list {
    border-radius: 4px;
    padding: 0;
  }

  .Select__option {
    white-space: nowrap;
  }

  .Select__option:hover,
  .Select__option:active,
  .Select__option--is-focused {
    background: ${COLORS.NEUTRAL.MYSTIC_300};
    color: inherit;
    cursor: pointer;
  }

  & .Select__single-value {
    overflow: initial;
    position: initial;
    transform: initial;
    top: initial;
    text-transform: uppercase;
    font-weight: 500;
  }

  .Select__value-container {
    padding: 0;
  }
`;

// eslint-disable-next-line react/no-multi-comp
const DropdownPill = ({ onChange, options, value }) => (
  <Dropdown
    onChange={(option) => onChange(option.value)}
    options={options}
    value={options.find((x) => x.value === value)}
  />
);

DropdownPill.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  value: PropTypes.string.isRequired,
};

export default DropdownPill;
