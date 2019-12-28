import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const Input = styled.input`
  border: 1px solid ${colors.mischka};
  border-radius: 0.25rem;
  padding: 0.5rem 0.7rem;
`;

const NumberField = props => {
  const handleChange = event => {
    const { value } = event.currentTarget;

    props.onChange(value, props.name);
  };

  return <Input {...props} onChange={handleChange} step={0.01} type="number" />;
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
