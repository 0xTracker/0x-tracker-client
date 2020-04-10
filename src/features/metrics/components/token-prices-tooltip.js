import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { DATE_FORMAT } from '../../../constants';
import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';
import formatDate from '../../../util/format-date';
import formatTokenAmount from '../../../util/format-token-amount';

const TokenPricesTooltip = ({ localCurrency, payload, tokenSymbol }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, price, tradeVolume } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: 'Price',
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
      title={formatDate(date, DATE_FORMAT.STANDARD)}
    />
  );
};

TokenPricesTooltip.propTypes = {
  localCurrency: PropTypes.string.isRequired,
  payload: PropTypes.array,
  tokenSymbol: PropTypes.string.isRequired,
};

TokenPricesTooltip.defaultProps = {
  payload: undefined,
};

export default TokenPricesTooltip;
