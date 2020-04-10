import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { DATE_FORMAT } from '../../../constants';
import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';
import formatDate from '../../../util/format-date';

const AddressMetricsTooltip = ({ localCurrency, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, tradeCount, tradeVolume } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: `Volume (${localCurrency})`,
          value: formatCurrency(tradeVolume, localCurrency),
        },
        {
          label: 'Trades',
          value: tradeCount,
        },
      ]}
      title={formatDate(date, DATE_FORMAT.STANDARD)}
    />
  );
};

AddressMetricsTooltip.propTypes = {
  localCurrency: PropTypes.string.isRequired,
  payload: PropTypes.array,
};

AddressMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default AddressMetricsTooltip;
