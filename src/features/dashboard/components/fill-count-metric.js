import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import DashboardMetric from './dashboard-metric';
import LoadingIndicator from '../../../components/loading-indicator';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const FillCountMetric = ({ className, fillCount }) => (
  <DashboardMetric className={className} title="Fill Count (24H)">
    {_.isNumber(fillCount)
      ? numeral(fillCount).format('0,0')
      : loadingIndicator}
  </DashboardMetric>
);

FillCountMetric.propTypes = {
  className: PropTypes.string,
  fillCount: PropTypes.number,
};

FillCountMetric.defaultProps = {
  className: undefined,
  fillCount: undefined,
};

export default FillCountMetric;
