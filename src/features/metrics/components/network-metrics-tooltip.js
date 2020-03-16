import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { DATE_FORMAT } from '../../../constants';
import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';
import formatDate from '../../../util/format-date';
import Number from '../../../components/number';

const NetworkMetricsTooltip = ({ currency, payload }) => {
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
    <ChartTooltip
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
      title={formatDate(date, DATE_FORMAT.STANDARD)}
    />
  );
};

NetworkMetricsTooltip.propTypes = {
  currency: PropTypes.string.isRequired,
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
