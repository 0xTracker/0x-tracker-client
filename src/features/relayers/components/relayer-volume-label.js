import PropTypes from 'prop-types';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import LocalisedAmount from '../../currencies/components/localised-amount';

const RelayerVolumeLabel = ({ relayer }) => {
  const volume = relayer.stats.volume[BASE_CURRENCY];

  if (relayer.stats.trades === 0) {
    return '-';
  }

  if (volume === 0) {
    return 'Unknown';
  }

  return <LocalisedAmount amount={volume} />;
};

RelayerVolumeLabel.propTypes = {
  relayer: PropTypes.shape({
    stats: PropTypes.shape({
      trades: PropTypes.number.isRequired,
      volume: PropTypes.shape({
        [BASE_CURRENCY]: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default RelayerVolumeLabel;
