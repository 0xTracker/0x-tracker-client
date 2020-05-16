import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const createTooltip = (period) => {
  if (period === 'all') {
    return 'Total value of all trades since 0x was launched.';
  }

  return `Total value of all trades in the last ${period}.`;
};

const TradeVolumeWidget = ({ period, volume, ...otherProps }) => (
  <StatWidget
    period={period}
    title="Volume"
    tooltip={createTooltip(period)}
    {...otherProps}
  >
    {_.isNumber(volume) ? (
      <LocalisedAmount
        amount={volume}
        loadingIndicator={loadingIndicator}
        summarize
      />
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
