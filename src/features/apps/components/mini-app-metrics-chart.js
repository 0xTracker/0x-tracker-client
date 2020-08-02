import _ from 'lodash';
import { Bar, BarChart } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';

const MiniAppMetricsChart = ({ data, height, type, width }) => {
  if (_.isEmpty(data)) {
    return null;
  }

  return (
    <BarChart
      data={data.map((dataPoint) => ({
        ...dataPoint,
        date: dataPoint.date.toISOString(),
      }))}
      height={height}
      margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      width={width}
    >
      <Bar
        animationDuration={0}
        dataKey={type}
        fill={COLORS.NEUTRAL.MYSTIC_200}
      />
    </BarChart>
  );
};

MiniAppMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      totalTrades: PropTypes.number.isRequired,
      totalVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  height: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['totalTrades', 'totalVolume']),
  width: PropTypes.number.isRequired,
};

MiniAppMetricsChart.defaultProps = {
  type: 'totalVolume',
};

export default MiniAppMetricsChart;
