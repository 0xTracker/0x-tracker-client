import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { DATE_FORMAT } from '../../../constants';
import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';
import formatDate from '../../../util/format-date';

const NetworkVolumeTooltip = ({ currency, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, fills, volume } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: 'volume',
          value: formatCurrency(volume, currency),
        },
        {
          label: 'fills',
          value: fills.toString(),
        },
      ]}
      title={formatDate(date, DATE_FORMAT.STANDARD)}
    />
  );
};

NetworkVolumeTooltip.propTypes = {
  currency: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        date: PropTypes.string.isRequired,
        fills: PropTypes.number.isRequired,
        volume: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

NetworkVolumeTooltip.defaultProps = {
  payload: undefined,
};

export default NetworkVolumeTooltip;
