import PropTypes from 'prop-types';
import React from 'react';

import { UnknownIcon } from '../../../components/icons';
import { COLORS } from '../../../styles/constants';

const UnknownRelayerImage = ({ size, ...otherProps }) => (
  <UnknownIcon
    css={`
      color: ${COLORS.NEUTRAL.MYSTIC_500};
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
