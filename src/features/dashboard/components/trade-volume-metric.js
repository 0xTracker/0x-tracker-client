import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import DashboardMetric from './dashboard-metric';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const TradeVolumeMetric = ({ className, volume }) => (
  <DashboardMetric className={className} title="Trade (24H)">
    {_.isNumber(volume) ? (
      <LocalisedAmount amount={volume} loadingIndicator={loadingIndicator} />
    ) : (
      loadingIndicator
    )}
  </DashboardMetric>
);

TradeVolumeMetric.propTypes = {
  className: PropTypes.string,
  volume: PropTypes.number,
};

TradeVolumeMetric.defaultProps = {
  className: undefined,
  volume: undefined,
};

export default TradeVolumeMetric;
