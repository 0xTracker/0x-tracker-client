import React from 'react';

import LocalisedAmount from '../../currencies/components/localised-amount';
import tradersPropTypes from '../prop-types';

const TraderVolumeLabel = ({ stats }) => {
  const { fillVolume } = stats;

  if (fillVolume.total === 0) {
    return 'Unknown';
  }

  return <LocalisedAmount amount={fillVolume.total} />;
};

TraderVolumeLabel.propTypes = {
  stats: tradersPropTypes.traderStats.isRequired,
};

export default TraderVolumeLabel;
