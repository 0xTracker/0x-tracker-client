import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const createTooltip = (period) => {
  if (period === 'all') {
    return 'Number of unique trader addresses that have been active since 0x was launched.';
  }

  return `Number of unique trader addresses which were active in the last ${period}.`;
};

const ActiveTradersWidget = ({ period, traderCount, ...otherProps }) => (
  <StatWidget
    period={period}
    title="Active Traders"
    tooltip={createTooltip(period)}
    {...otherProps}
  >
    {_.isNumber(traderCount)
      ? numeral(traderCount).format('0,0')
      : loadingIndicator}
  </StatWidget>
);

ActiveTradersWidget.propTypes = {
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  traderCount: PropTypes.number,
};

ActiveTradersWidget.defaultProps = {
  className: undefined,
  period: undefined,
  traderCount: undefined,
};

export default ActiveTradersWidget;
