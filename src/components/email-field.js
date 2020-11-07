import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const Input = styled.input`
  border: 2px solid ${COLORS.NEUTRAL.MYSTIC_400};
  border-radius: 0.25rem;
  color: inherit;
  padding: 0.5rem 0.7rem;
  width: 100%;

  &:active,
  &:focus {
    border: 2px solid ${COLORS.NEUTRAL.MYSTIC_500};
  }

  &::placeholder {
    color: ${COLORS.NEUTRAL.MYSTIC_500};
    opacity: 1;
  }

  &:disabled {
    color: ${COLORS.NEUTRAL.MYSTIC_700};
  }
`;

const EmailField = ({ name, onChange, value, ...otherProps }) => {
  const handleChange = (event) => {
    const newValue = event.currentTarget.value;

    onChange(newValue, name);
  };

  const sanitizedValue = _.isEmpty(value) ? '' : value;

  return (
    <Input
      name={name}
      onChange={handleChange}
      type="email"
      value={sanitizedValue}
      {...otherProps}
    />
  );
};

EmailField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
};

EmailField.defaultProps = {
  placeholder: undefined,
  value: undefined,
};

export default EmailField;
