import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import DashboardMetric from './dashboard-metric';
import LoadingIndicator from '../../../components/loading-indicator';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const ActiveTradersMetric = ({ className, traderCount }) => (
  <DashboardMetric className={className} title="Active Traders (24H)">
    {_.isNumber(traderCount)
      ? numeral(traderCount).format('0,0')
      : loadingIndicator}
  </DashboardMetric>
);

ActiveTradersMetric.propTypes = {
  className: PropTypes.string,
  traderCount: PropTypes.number,
};

ActiveTradersMetric.defaultProps = {
  className: undefined,
  traderCount: undefined,
};

export default ActiveTradersMetric;
