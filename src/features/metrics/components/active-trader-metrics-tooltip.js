import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import MetricsChartTooltip from './metrics-chart-tooltip';
import Number from '../../../components/number';

const ActiveTraderMetricsTooltip = ({ granularity, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, makerCount, takerCount, traderCount } = payload[0].payload;

  return (
    <MetricsChartTooltip
      date={date}
      granularity={granularity}
      items={[
        {
          label: 'Makers',
          value: <Number>{makerCount}</Number>,
        },
        {
          label: 'Takers',
          value: <Number>{takerCount}</Number>,
        },
        {
          label: 'Traders',
          value: <Number>{traderCount}</Number>,
        },
      ]}
    />
  );
};

ActiveTraderMetricsTooltip.propTypes = {
  granularity: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        date: PropTypes.string.isRequired,
        makerCount: PropTypes.number.isRequired,
        takerCount: PropTypes.number.isRequired,
        traderCount: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

ActiveTraderMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default ActiveTraderMetricsTooltip;
