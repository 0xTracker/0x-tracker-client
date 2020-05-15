import PropTypes from 'prop-types';
import React from 'react';

const EtherscanIcon = ({ size, ...otherProps }) => (
  <img
    height={size}
    src="https://resources.0xtracker.com/logos/etherscan.png"
    width={size}
    {...otherProps}
  />
);

EtherscanIcon.propTypes = {
  size: PropTypes.number,
};

EtherscanIcon.defaultProps = {
  size: 20,
};

export default EtherscanIcon;
