import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import MetricsChartTooltip from '../../metrics/components/metrics-chart-tooltip';
import Number from '../../../components/number';

const ActiveRelayerMetricsTooltip = ({ granularity, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, activeRelayers } = payload[0].payload;

  return (
    <MetricsChartTooltip
      date={date}
      granularity={granularity}
      items={[
        {
          label: 'Active Relayers',
          value: <Number>{activeRelayers}</Number>,
        },
      ]}
    />
  );
};

ActiveRelayerMetricsTooltip.propTypes = {
  granularity: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        activeRelayers: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
};

ActiveRelayerMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default ActiveRelayerMetricsTooltip;
