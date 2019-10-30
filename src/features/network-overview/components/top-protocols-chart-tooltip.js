import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import ChartTooltip from '../../../components/chart-tooltip';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Number from '../../../components/number';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const TopProtocolsChartTooltip = ({ payload }) => {
  const displayCurrency = useDisplayCurrency();

  if (_.isNil(payload) || _.isEmpty(payload)) {
    return null;
  }

  const {
    share,
    protocolVersion,
    tradeCount,
    tradeVolume,
  } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: 'share',
          value:
            share === 0 ? 'Unknown' : `${numeral(share).format('0.[00]')}%`,
        },
        {
          label: `trade volume (${displayCurrency})`,
          value:
            tradeVolume === 0 ? (
              'Unknown'
            ) : (
              <LocalisedAmount amount={tradeVolume} />
            ),
        },
        {
          label: 'trade count',
          value: <Number>{tradeCount}</Number>,
        },
      ]}
      title={`v${protocolVersion} Protocol`}
    />
  );
};

TopProtocolsChartTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        protocolVersion: PropTypes.number.isRequired,
        share: PropTypes.number.isRequired,
        tradeCount: PropTypes.number.isRequired,
        tradeVolume: PropTypes.number.isRequired,
      }),
    }),
  ),
};

TopProtocolsChartTooltip.defaultProps = {
  payload: undefined,
};

export default TopProtocolsChartTooltip;
