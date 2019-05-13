import { useTimeout } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const AlignCenter = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

const dimensions = {
  large: 50,
  medium: 30,
  small: 22,
};

const LoadingIndicator = ({ centered, size, type }) => {
  const ready = useTimeout(300);

  if (!ready) {
    return null;
  }

  const indicator = (
    <ReactLoading
      color="currentColor"
      delay={0}
      height={dimensions[size]}
      type={type === 'cylon' ? 'cylon' : 'spin'}
      width={dimensions[size]}
    />
  );

  if (centered) {
    return <AlignCenter>{indicator}</AlignCenter>;
  }

  return indicator;
};

LoadingIndicator.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['cylon', 'spinner']),
};

LoadingIndicator.defaultProps = {
  size: 'large',
  type: 'spinner',
};

export default LoadingIndicator;
