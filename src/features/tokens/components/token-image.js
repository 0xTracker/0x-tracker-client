import _ from 'lodash';
import { CopperCoin } from 'styled-icons/remix-fill';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';

const TokenImage = ({ className, imageUrl, size }) =>
  _.isString(imageUrl) ? (
    <img
      className={className}
      css={`
        border-radius: 0.25rem;
        height: ${size};
        width: ${size};
      `}
      src={imageUrl}
    />
  ) : (
    <CopperCoin color={COLORS.ACCENT.ANZAC_600} height={size} width={size} />
  );

TokenImage.propTypes = {
  className: PropTypes.string, // eslint-disable-line react/require-default-props
  imageUrl: PropTypes.string,
  size: PropTypes.string,
};

TokenImage.defaultProps = {
  imageUrl: undefined,
  size: '40px',
};

export default TokenImage;
