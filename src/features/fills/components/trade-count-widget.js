import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { summarizeNumber } from '../../../util';
import LoadingIndicator from '../../../components/loading-indicator';
import PercentageChange from '../../../components/percentage-change';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const createTooltip = (period) => {
  if (period === 'all') {
    return 'Total number of trades since 0x was launched.';
  }

  return `Total number of trades in the last ${period}.`;
};

const TradeCountWidget = ({ change, period, tradeCount, ...otherProps }) => (
  <StatWidget
    period={period}
    title="Trades"
    tooltip={createTooltip(period)}
    {...otherProps}
  >
    {_.isNumber(tradeCount) && tradeCount > 0 && (
      <span css="align-items: baseline; display: flex;">
        {summarizeNumber(tradeCount)}
        {change !== undefined && <PercentageChange>{change}</PercentageChange>}
      </span>
    )}
    {_.isNumber(tradeCount) && tradeCount === 0 && 'None'}
    {!_.isNumber(tradeCount) && loadingIndicator}
  </StatWidget>
);

TradeCountWidget.propTypes = {
  change: PropTypes.number,
  period: sharedPropTypes.timePeriod,
  tradeCount: PropTypes.number,
};

TradeCountWidget.defaultProps = {
  change: undefined,
  period: undefined,
  tradeCount: undefined,
};

export default TradeCountWidget;
