import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { summarizeNumber } from '../../../util';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const BridgedTradesWidget = ({ period, tradeCount, ...otherProps }) => (
  <StatWidget
    period={period}
    title="Bridged Trades"
    tooltip="The total number of trades in the selected period which sourced liquidity from bridging contracts."
    {...otherProps}
  >
    {_.isNumber(tradeCount) ? summarizeNumber(tradeCount) : loadingIndicator}
  </StatWidget>
);

BridgedTradesWidget.propTypes = {
  period: sharedPropTypes.timePeriod,
  tradeCount: PropTypes.number,
};

BridgedTradesWidget.defaultProps = {
  period: undefined,
  tradeCount: undefined,
};

export default BridgedTradesWidget;
