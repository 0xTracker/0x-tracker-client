import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { DATE_FORMAT } from '../../../constants';
import ChartTooltip from '../../../components/chart-tooltip';
import formatDate from '../../../util/format-date';
import formatTokenAmount from '../../../util/format-token-amount';
import LocalisedAmount from '../../currencies/components/localised-amount';

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
          value: <LocalisedAmount amount={price.close} />,
        },
        {
          label: `Volume (${localCurrency})`,
          value: <LocalisedAmount amount={tradeVolume.USD} />,
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
