import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';

const TopRelayersTooltip = ({ currency, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { relayer, trades, volume, volumeShare } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: 'market share',
          value: `${numeral(volumeShare).format('0.[00]')}%`,
        },
        {
          label: 'total trades',
          value: numeral(trades).format('0,0'),
        },
        {
          label: `volume (${currency})`,
          value: formatCurrency(volume, currency),
        },
      ]}
      title={relayer.name}
    />
  );
};

TopRelayersTooltip.propTypes = {
  currency: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        relayer: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
        trades: PropTypes.number.isRequired,
        volume: PropTypes.number.isRequired,
        volumeShare: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

TopRelayersTooltip.defaultProps = {
  payload: undefined,
};

export default TopRelayersTooltip;
