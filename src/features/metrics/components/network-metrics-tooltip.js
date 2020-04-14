import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import formatCurrency from '../../../util/format-currency';
import MetricsChartTooltip from './metrics-chart-tooltip';
import Number from '../../../components/number';

const NetworkMetricsTooltip = ({ currency, granularity, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const {
    date,
    protocolFees,
    protocolFeesETH,
    tradeCount,
    tradeVolume,
  } = payload[0].payload;

  return (
    <MetricsChartTooltip
      date={date}
      granularity={granularity}
      items={[
        {
          label: `Protocol Fees (${currency})`,
          value: formatCurrency(protocolFees, currency),
        },
        {
          label: 'Protocol Fees (ETH)',
          value: protocolFeesETH,
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

NetworkMetricsTooltip.propTypes = {
  currency: PropTypes.string.isRequired,
  granularity: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        date: PropTypes.string.isRequired,
        protocolFees: PropTypes.number.isRequired,
        protocolFeesETH: PropTypes.string.isRequired,
        tradeCount: PropTypes.number.isRequired,
        tradeVolume: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

NetworkMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default NetworkMetricsTooltip;
