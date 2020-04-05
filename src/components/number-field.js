import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const Input = styled.input`
  border: 1px solid ${colors.mischka};
  border-radius: 0.25rem;
  padding: 0.5rem 0.7rem;
  width: 100%;
`;

const NumberField = ({ name, onChange, value, ...otherProps }) => {
  const handleChange = (event) => {
    const newValue = event.currentTarget.value;

    onChange(newValue, name);
  };

  const sanitizedValue = _.isEmpty(value) && value !== 0 ? '' : value;

  return (
    <Input
      name={name}
      onChange={handleChange}
      step={0.01}
      type="number"
      value={sanitizedValue}
      {...otherProps}
    />
  );
};

NumberField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
};

NumberField.defaultProps = {
  placeholder: undefined,
  value: undefined,
};

export default NumberField;
