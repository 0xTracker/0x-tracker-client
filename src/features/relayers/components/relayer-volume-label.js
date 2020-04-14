import PropTypes from 'prop-types';
import React from 'react';

import LocalisedAmount from '../../currencies/components/localised-amount';

const RelayerVolumeLabel = ({ stats }) => {
  const { tradeVolume } = stats;

  if (tradeVolume === 0) {
    return 'Unknown';
  }

  return <LocalisedAmount amount={tradeVolume} summarize />;
};

RelayerVolumeLabel.propTypes = {
  stats: PropTypes.shape({
    tradeVolume: PropTypes.number,
  }).isRequired,
};

export default RelayerVolumeLabel;
