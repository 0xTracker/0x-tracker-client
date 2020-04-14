import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { formatCurrency } from '../../../util';
import MetricsChartTooltip from './metrics-chart-tooltip';
import Number from '../../../components/number';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const RelayerMetricsTooltip = ({ granularity, payload }) => {
  const displayCurrency = useDisplayCurrency();

  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, tradeCount, tradeVolume, traderCount } = payload[0].payload;

  return (
    <MetricsChartTooltip
      date={date}
      granularity={granularity}
      items={[
        {
          label: `Volume (${displayCurrency})`,
          value: formatCurrency(tradeVolume, displayCurrency),
        },
        {
          label: 'Trades',
          value: <Number>{tradeCount}</Number>,
        },

        {
          label: 'Active Traders',
          value: <Number>{traderCount}</Number>,
        },
      ]}
    />
  );
};

RelayerMetricsTooltip.propTypes = {
  granularity: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        date: PropTypes.string.isRequired,
        tradeCount: PropTypes.number.isRequired,
        tradeVolume: PropTypes.number.isRequired,
        traderCount: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

RelayerMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default RelayerMetricsTooltip;
