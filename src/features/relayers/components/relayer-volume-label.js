import PropTypes from 'prop-types';
import React from 'react';

import LocalisedAmount from '../../currencies/components/localised-amount';

const RelayerVolumeLabel = ({ stats }) => {
  const { volume } = stats;

  if (stats.trades === undefined || stats.trades === 0) {
    return '-';
  }

  if (volume === 0) {
    return 'Unknown';
  }

  return <LocalisedAmount amount={volume} />;
};

RelayerVolumeLabel.propTypes = {
  stats: PropTypes.shape({
    trades: PropTypes.number,
    volume: PropTypes.number,
  }).isRequired,
};

export default RelayerVolumeLabel;
