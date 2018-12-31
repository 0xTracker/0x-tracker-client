import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import DashboardMetric from './dashboard-metric';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const NetworkFeesMetric = ({ className, fees }) => (
  <DashboardMetric className={className} title="Network Fees (24H)">
    {_.isNumber(fees) ? (
      <LocalisedAmount amount={fees} loadingIndicator={loadingIndicator} />
    ) : (
      loadingIndicator
    )}
  </DashboardMetric>
);

NetworkFeesMetric.propTypes = {
  className: PropTypes.number,
  fees: PropTypes.number,
};

NetworkFeesMetric.defaultProps = {
  className: undefined,
  fees: undefined,
};

export default NetworkFeesMetric;
