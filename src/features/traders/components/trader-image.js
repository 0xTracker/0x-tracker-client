import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { TradersIcon } from '../../../components/icons';
import Blockie from '../../../components/blockie';

const TraderImage = ({ address, imageUrl, size, ...otherProps }) => {
  if (_.isString(imageUrl)) {
    return (
      <img
        css={`
          border-radius: 4px;
          margin-right: 12px;
          height: ${size}px;
        `}
        src={imageUrl}
        {...otherProps}
      />
    );
  }

  if (_.isString(address)) {
    return (
      <Blockie
        css="border-radius: 4px; margin-right: 12px;"
        seed={address}
        size={`${size}px`}
        {...otherProps}
      />
    );
  }

  return (
    <TradersIcon css="border-radius: 4px; margin-right: 12px;" size={size} />
  );
};

TraderImage.propTypes = {
  address: PropTypes.string,
  imageUrl: PropTypes.string,
  size: PropTypes.number.isRequired,
};

TraderImage.defaultProps = {
  address: undefined,
  imageUrl: undefined,
};

export default TraderImage;
