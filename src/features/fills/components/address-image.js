import PropTypes from 'prop-types';
import React from 'react';

import Blockie from '../../../components/blockie';

const AddressImage = ({ address, className, imageUrl, size }) => {
  if (!imageUrl) {
    return (
      <Blockie
        className={className}
        css="border-radius: 0.25rem;"
        seed={address}
        size={size}
      />
    );
  }

  return (
    <img
      className={className}
      css={`
        border-radius: 0.25rem;
        height: ${size};
        width: ${size};
      `}
      src={imageUrl}
    />
  );
};

AddressImage.propTypes = {
  address: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  size: PropTypes.string.isRequired,
};

AddressImage.defaultProps = {
  className: undefined,
  imageUrl: undefined,
};

export default AddressImage;
