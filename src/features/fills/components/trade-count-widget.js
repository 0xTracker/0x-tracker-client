import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const TradeCountWidget = ({ className, period, tradeCount }) => (
  <StatWidget className={className} period={period} title="Trade Count">
    {_.isNumber(tradeCount)
      ? numeral(tradeCount).format('0,0')
      : loadingIndicator}
  </StatWidget>
);

TradeCountWidget.propTypes = {
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  tradeCount: PropTypes.number,
};

TradeCountWidget.defaultProps = {
  className: undefined,
  period: undefined,
  tradeCount: undefined,
};

export default TradeCountWidget;
