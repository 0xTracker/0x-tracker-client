import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const AlignCenter = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const LoadingIndicator = ({ color, isCentered, size, type }) => {
  const indicator = (
    <ReactLoading
      color={color === 'light' ? colors.white : colors.tuna}
      delay={0}
      height={size === 'small' ? 22 : undefined}
      type={type === 'cylon' ? 'cylon' : 'spin'}
      width={size === 'small' ? 22 : undefined}
    />
  );

  if (isCentered) {
    return <AlignCenter>{indicator}</AlignCenter>;
  }

  return indicator;
};

LoadingIndicator.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
  size: PropTypes.oneOf(['small', 'large']),
  type: PropTypes.oneOf(['cylon', 'spinner']),
};

LoadingIndicator.defaultProps = {
  color: 'dark',
  size: 'large',
  type: 'spinner',
};

export default LoadingIndicator;
