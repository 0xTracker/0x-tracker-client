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

  const { relayer, share, trades, volume } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: 'market share',
          value: `${numeral(share).format('0.[00]')}%`,
        },
        {
          label: `total trades`,
          value: numeral(trades).format('0,0'),
        },
        {
          label: `volume (${currency})`,
          value: formatCurrency(volume[currency], currency),
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
      relayer: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      share: PropTypes.number.isRequired,
      tradeCount: PropTypes.number.isRequired,
      volume: PropTypes.number.isRequired,
    }),
  ),
};

TopRelayersTooltip.defaultProps = {
  payload: undefined,
};

export default TopRelayersTooltip;
