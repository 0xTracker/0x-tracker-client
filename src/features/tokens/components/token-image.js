import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { TokenIcon } from '../../../components/icons';

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
    <TokenIcon
      className={className}
      css={`
        color: ${COLORS.ACCENT.ANZAC_600};
      `}
      size={size}
    />
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
