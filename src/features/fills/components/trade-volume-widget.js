import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const TradeVolumeWidget = ({ className, period, volume }) => (
  <StatWidget className={className} period={period} title="Trade Volume">
    {_.isNumber(volume) ? (
      <LocalisedAmount amount={volume} loadingIndicator={loadingIndicator} />
    ) : (
      loadingIndicator
    )}
  </StatWidget>
);

TradeVolumeWidget.propTypes = {
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  volume: PropTypes.number,
};

TradeVolumeWidget.defaultProps = {
  className: undefined,
  period: undefined,
  volume: undefined,
};

export default TradeVolumeWidget;
