import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import Number from '../../../components/number';
import PercentageChange from '../../../components/percentage-change';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const createTooltip = (period) => {
  if (period === 'all') {
    return 'Number of unique trader addresses that have been active since 0x was launched.';
  }

  return `Number of unique trader addresses which were active in the last ${period}.`;
};

const ActiveTradersWidget = ({
  change,
  period,
  traderCount,
  ...otherProps
}) => (
  <StatWidget
    period={period}
    title="Active Traders"
    tooltip={createTooltip(period)}
    {...otherProps}
  >
    {_.isNumber(traderCount) ? (
      <span css="align-items: baseline; display: flex;">
        <Number summarize>{traderCount}</Number>
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
  traderCount: PropTypes.number,
};

ActiveTradersWidget.defaultProps = {
  change: undefined,
  className: undefined,
  period: undefined,
  traderCount: undefined,
};

export default ActiveTradersWidget;
