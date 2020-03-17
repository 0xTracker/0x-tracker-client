import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import { CircleIcon } from '../../../components/icons';

const TokenImage = ({ imageUrl, size }) =>
  _.isString(imageUrl) ? (
    <img
      css={`
        border-radius: 0.25rem;
        height: ${size};
        width: ${size};
      `}
      src={imageUrl}
    />
  ) : (
    <CircleIcon color={colors.mystic} height="2.75rem" width="2.75rem" />
  );

TokenImage.propTypes = {
  imageUrl: PropTypes.string,
  size: PropTypes.string,
};

TokenImage.defaultProps = {
  imageUrl: undefined,
  size: '2.75rem',
};

export default TokenImage;
