import _ from 'lodash';
import { format as formatDate } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';

import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';
import formatToken from '../../../util/format-token';

const TokenVolumeTooltip = ({ localCurrency, payload, tokenSymbol }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, localizedVolume, tokenVolume } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: `volume (${localCurrency})`,
          value: formatCurrency(localizedVolume, localCurrency),
        },
        {
          label: `volume (${tokenSymbol || 'token'})`,
          value: tokenVolume !== null ? formatToken(tokenVolume) : 'Unknown',
        },
      ]}
      title={formatDate(date, 'MMMM Do YYYY, hh:mm A')}
    />
  );
};

TokenVolumeTooltip.propTypes = {
  localCurrency: PropTypes.string.isRequired,
  payload: PropTypes.array,
  tokenSymbol: PropTypes.string.isRequired,
};

TokenVolumeTooltip.defaultProps = {
  payload: undefined,
};

export default TokenVolumeTooltip;
