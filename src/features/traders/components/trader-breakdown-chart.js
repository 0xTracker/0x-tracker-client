import _ from 'lodash';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import TraderBreakdownTooltip from './trader-breakdown-tooltip';

const TraderBreakdownChart = ({ data }) => {
  if (_.isEmpty(data)) {
    return 'No data available';
  }

  const COLORS = [colors.indigo, colors.martinique, colors.santasGray];

  return (
    <ResponsiveContainer>
      <PieChart isAnimationActive={false}>
        <Pie
          data={data}
          dataKey="count"
          isAnimationActive={false}
          label={({ traderType }) => `${_.startCase(traderType)}s`}
          labelLine
          nameKey="traderType"
          paddingAngle={0}
        >
          {data.map((entry, index) => (
            <Cell fill={COLORS[index]} key={`cell-${entry.traderType}`} />
          ))}
        </Pie>
        <Tooltip content={<TraderBreakdownTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

TraderBreakdownChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      traderType: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TraderBreakdownChart;
