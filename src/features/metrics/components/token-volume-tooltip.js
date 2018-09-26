import { format as formatDate } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';

import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';
import formatToken from '../../../util/format-token';

const TokenVolumeTooltip = ({ currency, payload, token }) => {
  if (payload === undefined || payload.length === 0) {
    return null;
  }

  const { date, tokenVolume, volume } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: `volume (${currency})`,
          value: formatCurrency(volume, currency),
        },
        {
          label: `volume (${token})`,
          value: formatToken(tokenVolume),
        },
      ]}
      title={formatDate(date, 'MMMM Do YYYY, hh:mm A')}
    />
  );
};

TokenVolumeTooltip.propTypes = {
  currency: PropTypes.string.isRequired,
  payload: PropTypes.array,
  token: PropTypes.string.isRequired,
};

TokenVolumeTooltip.defaultProps = {
  payload: undefined,
};

export default TokenVolumeTooltip;
