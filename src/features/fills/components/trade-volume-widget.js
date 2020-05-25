import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { getPeriodDescriptor } from '../../../util';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PercentageChange from '../../../components/percentage-change';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const createTooltip = (period) =>
  `Value of all trades ${getPeriodDescriptor(period)}.`;

const TradeVolumeWidget = ({
  change,
  period,
  tooltip,
  volume,
  ...otherProps
}) => (
  <StatWidget
    period={period}
    title="Volume"
    tooltip={tooltip || createTooltip(period)}
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
  tooltip: PropTypes.string,
  volume: PropTypes.number,
};

TradeVolumeWidget.defaultProps = {
  change: undefined,
  className: undefined,
  period: undefined,
  tooltip: undefined,
  volume: undefined,
};

export default TradeVolumeWidget;
