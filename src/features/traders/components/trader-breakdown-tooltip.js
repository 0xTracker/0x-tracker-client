import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import ChartTooltip from '../../../components/chart-tooltip';
import Number from '../../../components/number';

const TraderBreakdownTooltip = ({ payload }) => {
  if (_.isNil(payload) || _.isEmpty(payload)) {
    return null;
  }

  const { count, traderType } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: 'Count',
          value: <Number>{count}</Number>,
        },
      ]}
      title={`Active ${_.startCase(traderType)}s`}
    />
  );
};

TraderBreakdownTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        count: PropTypes.number.isRequired,
        traderType: PropTypes.string.isRequired,
      }),
    }),
  ),
};

TraderBreakdownTooltip.defaultProps = {
  payload: undefined,
};

export default TraderBreakdownTooltip;
