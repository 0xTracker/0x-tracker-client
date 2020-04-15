import _ from 'lodash';
import { Bar, BarChart } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';

const MiniRelayerMetricsChart = React.memo(({ data, height, type, width }) => {
  if (_.isEmpty(data)) {
    return null;
  }

  return (
    <div
      css={`
        border-bottom: 1px solid ${colors.anzac};
      `}
    >
      <BarChart
        data={data.map((dataPoint) => ({
          ...dataPoint,
          date: dataPoint.date.toISOString(),
        }))}
        height={height}
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        width={width}
      >
        <Bar animationDuration={0} dataKey={type} fill={colors.anzac} />
      </BarChart>
    </div>
  );
});

MiniRelayerMetricsChart.displayName = 'MiniRelayerMetricsChart';

MiniRelayerMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  height: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['tradeCount', 'tradeVolume']),
  width: PropTypes.number.isRequired,
};

MiniRelayerMetricsChart.defaultProps = {
  type: 'tradeVolume',
};

export default MiniRelayerMetricsChart;
