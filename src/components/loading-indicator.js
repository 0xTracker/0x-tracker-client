import _ from 'lodash';
import { useTimeout } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const AlignCenter = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const dimensions = {
  large: 50,
  medium: 30,
  small: 22,
};

const LoadingIndicator = ({ centered, size, type, ...otherProps }) => {
  const [isReady] = useTimeout(300);

  if (isReady() === false) {
    return null;
  }

  const indicator = (
    <ReactLoading
      color={COLORS.NEUTRAL.MYSTIC_700}
      delay={0}
      height={_.isFinite(size) ? size : dimensions[size]}
      type={type === 'cylon' ? 'cylon' : 'spin'}
      width={_.isFinite(size) ? size : dimensions[size]}
      {...otherProps}
    />
  );

  if (centered) {
    return <AlignCenter>{indicator}</AlignCenter>;
  }

  return indicator;
};

LoadingIndicator.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.number,
  ]),
  type: PropTypes.oneOf(['cylon', 'spinner']),
};

LoadingIndicator.defaultProps = {
  size: 'large',
  type: 'spinner',
};

export default LoadingIndicator;
