import PropTypes from 'prop-types';
import React from 'react';

import LocalisedAmount from '../../currencies/components/localised-amount';

const AppVolumeLabel = ({ stats }) => {
  const { tradeVolume } = stats;

  if (tradeVolume.total === 0) {
    return 'Unknown';
  }

  return <LocalisedAmount amount={tradeVolume.total} summarize title={false} />;
};

AppVolumeLabel.propTypes = {
  stats: PropTypes.shape({
    tradeVolume: PropTypes.shape({
      total: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AppVolumeLabel;
