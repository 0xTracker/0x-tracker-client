import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'styled-components';

import { COLORS } from '../styles/constants';
import firstImage from '../assets/images/icons/first.png';
import secondImage from '../assets/images/icons/second.png';
import thirdImage from '../assets/images/icons/third.png';

const Rank = ({ children, imageSize, ...otherProps }) => {
  const elementCss = css`
    color: ${COLORS.NEUTRAL.MYSTIC_700};
    font-weight: 500;
    vertical-align: middle;
  `;

  const imageCss = css`
    ${elementCss};
    height: ${imageSize};
    width: ${imageSize};
  `;

  if (children === 1) {
    return <img css={imageCss} src={firstImage} {...otherProps} />;
  }

  if (children === 2) {
    return <img css={imageCss} src={secondImage} {...otherProps} />;
  }

  if (children === 3) {
    return <img css={imageCss} src={thirdImage} {...otherProps} />;
  }

  return (
    <span css={elementCss} {...otherProps}>
      {children}
    </span>
  );
};

Rank.propTypes = {
  children: PropTypes.number.isRequired,
  imageSize: PropTypes.string,
};

Rank.defaultProps = {
  imageSize: '24px',
};

export default Rank;
