import _ from 'lodash';
import { useTimeout } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
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
  small: 25,
};

const LoadingIndicator = ({ centered, color, size, type, ...otherProps }) => {
  const [isReady] = useTimeout(300);

  if (isReady() === false) {
    return null;
  }

  const indicator = (
    <div
      css={`
        fill: ${color};
        font-size: 0;
        width: ${_.isFinite(size) ? size : dimensions[size]}px;
      `}
      {...otherProps}
    >
      {type === 'cylon' ? (
        <svg viewBox="0 0 28 8" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="4" r="0" transform="translate(4 0)">
            <animate
              attributeName="r"
              begin="0"
              calcMode="spline"
              dur="1.2s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
              keyTimes="0;0.2;0.7;1"
              repeatCount="indefinite"
              values="0; 4; 0; 0"
            />
          </circle>
          <circle cx="0" cy="4" r="0" transform="translate(12 0)">
            <animate
              attributeName="r"
              begin="0.3"
              calcMode="spline"
              dur="1.2s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
              keyTimes="0;0.2;0.7;1"
              repeatCount="indefinite"
              values="0; 4; 0; 0"
            />
          </circle>
          <circle cx="0" cy="4" r="0" transform="translate(20 0)">
            <animate
              attributeName="r"
              begin="0.6"
              calcMode="spline"
              dur="1.2s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
              keyTimes="0;0.2;0.7;1"
              repeatCount="indefinite"
              values="0; 4; 0; 0"
            />
          </circle>
        </svg>
      ) : (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
            opacity=".25"
          />
          <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
            <animateTransform
              attributeName="transform"
              dur="0.8s"
              from="0 16 16"
              repeatCount="indefinite"
              to="360 16 16"
              type="rotate"
            />
          </path>
        </svg>
      )}
    </div>
  );

  if (centered) {
    return <AlignCenter>{indicator}</AlignCenter>;
  }

  return indicator;
};

LoadingIndicator.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.number,
  ]),
  type: PropTypes.oneOf(['cylon', 'spinner']),
};

LoadingIndicator.defaultProps = {
  color: COLORS.NEUTRAL.MYSTIC_800,
  size: 'large',
  type: 'spinner',
};

export default LoadingIndicator;
