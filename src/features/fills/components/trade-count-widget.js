import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { getPeriodDescriptor } from '../../../util';
import LoadingIndicator from '../../../components/loading-indicator';
import Number from '../../../components/number';
import PercentageChange from '../../../components/percentage-change';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const createTooltip = (period) =>
  `Number of trades ${getPeriodDescriptor(period)}.`;

const TradeCountWidget = ({
  change,
  period,
  tooltip,
  tradeCount,
  ...otherProps
}) => (
  <StatWidget
    period={period}
    title="Trades"
    tooltip={tooltip || createTooltip(period)}
    {...otherProps}
  >
    {_.isNumber(tradeCount) && tradeCount > 0 && (
      <span css="align-items: baseline; display: flex;">
        <Number summarize>{tradeCount}</Number>
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
  tooltip: PropTypes.string,
  tradeCount: PropTypes.number,
};

TradeCountWidget.defaultProps = {
  change: undefined,
  period: undefined,
  tooltip: undefined,
  tradeCount: undefined,
};

export default TradeCountWidget;
