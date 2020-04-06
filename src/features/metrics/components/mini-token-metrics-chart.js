import _ from 'lodash';
import { Area, AreaChart } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';

const MiniTokenMetricsChart = React.memo(({ data, height, type, width }) => {
  if (_.isEmpty(data)) {
    return null;
  }

  return (
    <AreaChart
      data={data.map((dataPoint) => ({
        ...dataPoint,
        date: dataPoint.date.toISOString(),
      }))}
      height={height}
      margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      width={width}
    >
      <Area
        animationDuration={0}
        dataKey={type}
        fill={colors.periwinkleGray}
        fillOpacity={1}
        stroke={colors.indigo}
        strokeOpacity={0.6}
        strokeWidth={1.5}
        type="monotone"
      />
    </AreaChart>
  );
});

MiniTokenMetricsChart.displayName = 'MiniTokenMetricsChart';

MiniTokenMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  height: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['tradeCount', 'tradeVolume.USD']),
  width: PropTypes.number.isRequired,
};

MiniTokenMetricsChart.defaultProps = {
  type: 'tradeVolume.USD',
};

export default MiniTokenMetricsChart;
