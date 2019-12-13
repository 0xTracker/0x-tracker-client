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

  const { protocolVersion, fillCount, fillVolume } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: `fill volume (${displayCurrency})`,
          value:
            fillVolume === 0 ? (
              'Unknown'
            ) : (
              <LocalisedAmount amount={fillVolume} />
            ),
        },
        {
          label: 'fill count',
          value: <Number>{fillCount}</Number>,
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
        fillCount: PropTypes.number.isRequired,
        fillVolume: PropTypes.number.isRequired,
        protocolVersion: PropTypes.number.isRequired,
      }),
    }),
  ),
};

TopProtocolsChartTooltip.defaultProps = {
  payload: undefined,
};

export default TopProtocolsChartTooltip;
