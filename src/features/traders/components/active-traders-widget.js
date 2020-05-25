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
  `Number of unique trader addresses associated with trades ${getPeriodDescriptor(
    period,
  )}.`;

const ActiveTradersWidget = ({
  change,
  period,
  tooltip,
  traderCount,
  ...otherProps
}) => (
  <StatWidget
    period={period}
    title="Active Traders"
    tooltip={tooltip || createTooltip(period)}
    {...otherProps}
  >
    {_.isNumber(traderCount) ? (
      <span css="align-items: baseline; display: flex;">
        {traderCount > 0 ? <Number summarize>{traderCount}</Number> : 'None'}
        {change !== undefined && <PercentageChange>{change}</PercentageChange>}
      </span>
    ) : (
      loadingIndicator
    )}
  </StatWidget>
);

ActiveTradersWidget.propTypes = {
  change: PropTypes.number,
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  tooltip: PropTypes.string,
  traderCount: PropTypes.number,
};

ActiveTradersWidget.defaultProps = {
  change: undefined,
  className: undefined,
  period: undefined,
  tooltip: undefined,
  traderCount: undefined,
};

export default ActiveTradersWidget;
