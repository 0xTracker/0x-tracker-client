import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { formatCurrency } from '../../../util';
import MetricsChartTooltip from '../../metrics/components/metrics-chart-tooltip';
import Number from '../../../components/number';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const AppMetricsTooltip = ({ granularity, payload }) => {
  const displayCurrency = useDisplayCurrency();

  if (_.isEmpty(payload)) {
    return null;
  }

  const { activeTraders, date, tradeCount, tradeVolume } = payload[0].payload;

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
          value: <Number>{activeTraders}</Number>,
        },
      ]}
    />
  );
};

AppMetricsTooltip.propTypes = {
  granularity: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        activeTraders: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        tradeCount: PropTypes.number.isRequired,
        tradeVolume: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

AppMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default AppMetricsTooltip;
