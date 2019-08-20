import PropTypes from 'prop-types';
import React from 'react';

import LocalisedAmount from '../../currencies/components/localised-amount';

const AddressVolumeLabel = ({ stats }) => {
  const { fillVolume } = stats;

  if (fillVolume === 0) {
    return 'Unknown';
  }

  return <LocalisedAmount amount={fillVolume} />;
};

AddressVolumeLabel.propTypes = {
  stats: PropTypes.shape({
    fillCount: PropTypes.number,
    fillVolume: PropTypes.number,
  }).isRequired,
};

export default AddressVolumeLabel;
