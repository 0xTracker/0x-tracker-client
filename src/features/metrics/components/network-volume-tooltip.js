import _ from 'lodash';
import { format as formatDate } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';

import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';

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
      title={formatDate(date, 'MMMM Do YYYY, hh:mm A')}
    />
  );
};

NetworkVolumeTooltip.propTypes = {
  currency: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      fills: PropTypes.number.isRequired,
      volume: PropTypes.number.isRequired,
    }),
  ),
};

NetworkVolumeTooltip.defaultProps = {
  payload: undefined,
};

export default NetworkVolumeTooltip;
