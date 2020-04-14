import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import formatCurrency from '../../../util/format-currency';
import MetricsChartTooltip from './metrics-chart-tooltip';
import Number from '../../../components/number';

const AddressMetricsTooltip = ({ currency, granularity, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, tradeCount, tradeVolume } = payload[0].payload;

  return (
    <MetricsChartTooltip
      date={date}
      granularity={granularity}
      items={[
        {
          label: `Volume (${currency})`,
          value: formatCurrency(tradeVolume, currency),
        },
        {
          label: 'Trades',
          value: <Number>{tradeCount}</Number>,
        },
      ]}
    />
  );
};

AddressMetricsTooltip.propTypes = {
  currency: PropTypes.string.isRequired,
  granularity: PropTypes.string.isRequired,
  payload: PropTypes.array,
};

AddressMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default AddressMetricsTooltip;
