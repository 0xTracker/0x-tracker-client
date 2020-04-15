import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import formatCurrency from '../../../util/format-currency';
import formatTokenAmount from '../../../util/format-token-amount';
import MetricsChartTooltip from './metrics-chart-tooltip';

const TokenPricesTooltip = ({
  granularity,
  localCurrency,
  payload,
  tokenSymbol,
}) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, price, tradeVolume } = payload[0].payload;

  return (
    <MetricsChartTooltip
      date={date}
      granularity={granularity}
      items={[
        {
          label: 'Price (Close)',
          value:
            price.close === null
              ? 'Unknown'
              : formatCurrency(price.close, localCurrency),
        },
        {
          label: `Volume (${localCurrency})`,
          value: formatCurrency(tradeVolume.USD, localCurrency),
        },
        {
          label: `Volume (${tokenSymbol || 'token'})`,
          value:
            tradeVolume.token !== null
              ? formatTokenAmount(tradeVolume.token)
              : 'Unknown',
        },
      ]}
    />
  );
};

TokenPricesTooltip.propTypes = {
  granularity: PropTypes.string.isRequired,
  localCurrency: PropTypes.string.isRequired,
  payload: PropTypes.array,
  tokenSymbol: PropTypes.string.isRequired,
};

TokenPricesTooltip.defaultProps = {
  payload: undefined,
};

export default TokenPricesTooltip;
