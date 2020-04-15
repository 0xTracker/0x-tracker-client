import _ from 'lodash';
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

  const { protocolVersion, fillCount, tradeVolume } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        { label: 'Protocol Version', value: protocolVersion },
        {
          label: 'Fills',
          value: <Number>{fillCount}</Number>,
        },
        {
          label: `Volume (${displayCurrency})`,
          value:
            tradeVolume === 0 ? (
              'Unknown'
            ) : (
              <LocalisedAmount amount={tradeVolume} />
            ),
        },
      ]}
    />
  );
};

TopProtocolsChartTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        fillCount: PropTypes.number.isRequired,
        protocolVersion: PropTypes.number.isRequired,
        tradeVolume: PropTypes.number.isRequired,
      }),
    }),
  ),
};

TopProtocolsChartTooltip.defaultProps = {
  payload: undefined,
};

export default TopProtocolsChartTooltip;
