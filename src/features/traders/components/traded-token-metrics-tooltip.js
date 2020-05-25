import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import MetricsChartTooltip from '../../metrics/components/metrics-chart-tooltip';
import Number from '../../../components/number';

const TradedTokenMetricsTooltip = ({ granularity, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, tradedTokens } = payload[0].payload;

  return (
    <MetricsChartTooltip
      date={date}
      granularity={granularity}
      items={[
        {
          label: 'Traded Tokens',
          value: <Number>{tradedTokens}</Number>,
        },
      ]}
    />
  );
};

TradedTokenMetricsTooltip.propTypes = {
  granularity: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        date: PropTypes.string.isRequired,
        tradedTokens: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

TradedTokenMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default TradedTokenMetricsTooltip;
