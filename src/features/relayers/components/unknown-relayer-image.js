import PropTypes from 'prop-types';
import React from 'react';

import { UnknownIcon } from '../../../components/icons';
import { colors } from '../../../styles/constants';

const UnknownRelayerImage = ({ size, ...otherProps }) => (
  <UnknownIcon
    css={`
      color: ${colors.black};
    `}
    height={size}
    width={size}
    {...otherProps}
  />
);

UnknownRelayerImage.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default UnknownRelayerImage;
