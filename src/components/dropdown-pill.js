import PropTypes from 'prop-types';
import React from 'react';
import ReactSelect, { components } from 'react-select';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import { CaretDownIcon } from './icons';

const { Option } = components;

const DropdownIndicator = () => <CaretDownIcon size={10} />;

// eslint-disable-next-line react/no-multi-comp
const CustomOption = (props) => {
  const { children, data } = props;

  if (data.icon === undefined) {
    return <Option {...props} />;
  }

  return (
    <Option {...props}>
      <div css="align-items: center; display: flex;">
        <div css="display: flex; margin-right: 0.5rem;">{data.icon}</div>
        {children}
      </div>
    </Option>
  );
};

CustomOption.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    icon: PropTypes.node,
  }).isRequired,
};

const Dropdown = styled(ReactSelect).attrs({
  classNamePrefix: 'Select',
  components: {
    DropdownIndicator,
    Option: CustomOption,
  },
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

  .Select__option--is-selected {
    background: ${COLORS.NEUTRAL.MYSTIC_200};
    color: inherit;
    cursor: pointer;
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
const DropdownPill = ({ className, onChange, options, value }) => (
  <Dropdown
    className={className}
    onChange={(option) => onChange(option.value)}
    options={options}
    value={options.find((x) => x.value === value)}
  />
);

DropdownPill.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  value: PropTypes.string.isRequired,
};

DropdownPill.defaultProps = {
  className: undefined,
};

export default DropdownPill;
