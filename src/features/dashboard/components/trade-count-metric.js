import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import DashboardMetric from './dashboard-metric';
import LoadingIndicator from '../../../components/loading-indicator';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const TradeCountMetric = ({ className, tradeCount }) => (
  <DashboardMetric className={className} title="Fills (24H)">
    {_.isNumber(tradeCount)
      ? numeral(tradeCount).format('0,0')
      : loadingIndicator}
  </DashboardMetric>
);

TradeCountMetric.propTypes = {
  className: PropTypes.string,
  tradeCount: PropTypes.number,
};

TradeCountMetric.defaultProps = {
  className: undefined,
  tradeCount: undefined,
};

export default TradeCountMetric;
