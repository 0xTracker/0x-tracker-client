import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { summarizeNumber } from '../../../util';
import LoadingIndicator from '../../../components/loading-indicator';
import PercentageChange from '../../../components/percentage-change';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const BridgedTradesWidget = ({ change, period, tradeCount, ...otherProps }) => (
  <StatWidget
    period={period}
    title="Bridged Trades"
    tooltip="The total number of trades which sourced liquidity from bridging contracts in the selected period."
    {...otherProps}
  >
    {_.isNumber(tradeCount) ? (
      <span css="align-items: baseline; display: flex;">
        {summarizeNumber(tradeCount)}
        {change !== undefined && <PercentageChange>{change}</PercentageChange>}
      </span>
    ) : (
      loadingIndicator
    )}
  </StatWidget>
);

BridgedTradesWidget.propTypes = {
  change: PropTypes.number,
  period: sharedPropTypes.timePeriod,
  tradeCount: PropTypes.number,
};

BridgedTradesWidget.defaultProps = {
  change: undefined,
  period: undefined,
  tradeCount: undefined,
};

export default BridgedTradesWidget;
