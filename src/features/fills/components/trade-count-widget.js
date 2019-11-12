import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const TradeCountWidget = ({ className, tradeCount }) => (
  <StatWidget className={className} title="Trade Count (24H)">
    {_.isNumber(tradeCount)
      ? numeral(tradeCount).format('0,0')
      : loadingIndicator}
  </StatWidget>
);

TradeCountWidget.propTypes = {
  className: PropTypes.string,
  tradeCount: PropTypes.number,
};

TradeCountWidget.defaultProps = {
  className: undefined,
  tradeCount: undefined,
};

export default TradeCountWidget;
