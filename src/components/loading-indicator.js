import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const AlignCenter = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const LoadingIndicator = ({ centered, size, type }) => {
  const indicator = (
    <ReactLoading
      color="currentColor"
      delay={0}
      height={size === 'small' ? 22 : undefined}
      type={type === 'cylon' ? 'cylon' : 'spin'}
      width={size === 'small' ? 22 : undefined}
    />
  );

  if (centered) {
    return <AlignCenter>{indicator}</AlignCenter>;
  }

  return indicator;
};

LoadingIndicator.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  type: PropTypes.oneOf(['cylon', 'spinner']),
};

LoadingIndicator.defaultProps = {
  size: 'large',
  type: 'spinner',
};

export default LoadingIndicator;
