import _ from 'lodash';
import { SwapBox } from 'styled-icons/remix-fill';
import { UserSecret } from 'styled-icons/fa-solid';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';

const AssetBridgeImage = ({
  className,
  height,
  imageUrl,
  isPrivate,
  width,
}) => {
  if (_.isString(imageUrl)) {
    return (
      <img
        className={className}
        css={`
          border-radius: 0.25rem;
          height: ${height}px;
          width: ${width}px;
        `}
        src={imageUrl}
      />
    );
  }

  if (isPrivate) {
    return (
      <UserSecret
        className={className}
        color={COLORS.NEUTRAL.MYSTIC_400}
        height={height}
        width={width}
      />
    );
  }

  return (
    <SwapBox
      className={className}
      color={COLORS.NEUTRAL.MYSTIC_400}
      height={height}
      width={width}
    />
  );
};

AssetBridgeImage.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  imageUrl: PropTypes.string,
  isPrivate: PropTypes.bool,
  width: PropTypes.number,
};

AssetBridgeImage.defaultProps = {
  className: undefined,
  height: 40,
  imageUrl: undefined,
  isPrivate: false,
  width: 40,
};

export default AssetBridgeImage;
