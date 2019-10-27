import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const TradeVolumeWidget = ({ className, volume }) => (
  <StatWidget className={className} title="Trade Volume (24H)">
    {_.isNumber(volume) ? (
      <LocalisedAmount amount={volume} loadingIndicator={loadingIndicator} />
    ) : (
      loadingIndicator
    )}
  </StatWidget>
);

TradeVolumeWidget.propTypes = {
  className: PropTypes.string,
  volume: PropTypes.number,
};

TradeVolumeWidget.defaultProps = {
  className: undefined,
  volume: undefined,
};

export default TradeVolumeWidget;
