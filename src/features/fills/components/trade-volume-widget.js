import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PercentageChange from '../../../components/percentage-change';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const createTooltip = (period) => {
  if (period === 'all') {
    return 'Total value of all trades since 0x was launched.';
  }

  return `Total value of all trades in the last ${period}.`;
};

const TradeVolumeWidget = ({ change, period, volume, ...otherProps }) => (
  <StatWidget
    period={period}
    title="Volume"
    tooltip={createTooltip(period)}
    {...otherProps}
  >
    {_.isNumber(volume) && volume > 0 && (
      <span css="align-items: baseline; display: flex;">
        <LocalisedAmount
          amount={volume}
          loadingIndicator={loadingIndicator}
          summarize
        />
        {change !== undefined && <PercentageChange>{change}</PercentageChange>}
      </span>
    )}
    {_.isNumber(volume) && volume === 0 && 'None'}
    {!_.isNumber(volume) && loadingIndicator}
  </StatWidget>
);

TradeVolumeWidget.propTypes = {
  change: PropTypes.number,
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  volume: PropTypes.number,
};

TradeVolumeWidget.defaultProps = {
  change: undefined,
  className: undefined,
  period: undefined,
  volume: undefined,
};

export default TradeVolumeWidget;
