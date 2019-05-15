import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import DashboardMetric from './dashboard-metric';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const FillVolumeMetric = ({ className, volume }) => (
  <DashboardMetric className={className} title="Fill Volume (24H)">
    {_.isNumber(volume) ? (
      <LocalisedAmount amount={volume} loadingIndicator={loadingIndicator} />
    ) : (
      loadingIndicator
    )}
  </DashboardMetric>
);

FillVolumeMetric.propTypes = {
  className: PropTypes.string,
  volume: PropTypes.number,
};

FillVolumeMetric.defaultProps = {
  className: undefined,
  volume: undefined,
};

export default FillVolumeMetric;
