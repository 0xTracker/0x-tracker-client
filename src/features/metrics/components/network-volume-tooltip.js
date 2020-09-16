import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import formatCurrency from '../../../util/format-currency';
import MetricsChartTooltip from './metrics-chart-tooltip';
import Number from '../../../components/number';

const NetworkVolumeTooltip = ({ currency, granularity, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { avgTradeSize, date, tradeCount, tradeVolume } = payload[0].payload;

  return (
    <MetricsChartTooltip
      date={date}
      granularity={granularity}
      items={[
        {
          label: 'Avg. Trade Size',
          value: formatCurrency(avgTradeSize, currency),
        },
        {
          label: 'Trade Count',
          value: <Number>{tradeCount}</Number>,
        },
        {
          label: `Trade Volume (${currency})`,
          value: formatCurrency(tradeVolume, currency),
        },
      ]}
    />
  );
};

NetworkVolumeTooltip.propTypes = {
  currency: PropTypes.string.isRequired,
  granularity: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        avgTradeSize: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        tradeCount: PropTypes.number.isRequired,
        tradeVolume: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

NetworkVolumeTooltip.defaultProps = {
  payload: undefined,
};

export default NetworkVolumeTooltip;
