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
    return 'Total number of trades since 0x was launched. Only includes activity from known relayers.';
  }

  return `Total number of trades in the last ${period}. Only includes activity from known relayers.`;
};

const TradeCountWidget = ({ period, tradeCount, ...otherProps }) => (
  <StatWidget
    period={period}
    title="Trade Count"
    tooltip={createTooltip(period)}
    {...otherProps}
  >
    {_.isNumber(tradeCount)
      ? numeral(tradeCount).format('0,0')
      : loadingIndicator}
  </StatWidget>
);

TradeCountWidget.propTypes = {
  period: sharedPropTypes.timePeriod,
  tradeCount: PropTypes.number,
};

TradeCountWidget.defaultProps = {
  period: undefined,
  tradeCount: undefined,
};

export default TradeCountWidget;
