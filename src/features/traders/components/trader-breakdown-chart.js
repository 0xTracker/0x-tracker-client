import _ from 'lodash';
import { Legend, PieChart, Pie, Cell, Tooltip } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import ChartContainer from '../../../components/chart-container';
import TraderBreakdownTooltip from './trader-breakdown-tooltip';

const TraderBreakdownChart = ({ data }) => {
  if (_.isEmpty(data)) {
    return 'No data available';
  }

  const COLORS = [colors.indigo, colors.violet];

  return (
    <ChartContainer>
      <PieChart isAnimationActive={false}>
        <Pie
          data={data}
          dataKey="count"
          isAnimationActive={false}
          nameKey="traderType"
          paddingAngle={0}
        >
          {data.map((entry, index) => (
            <Cell
              fill={COLORS[index]}
              fillOpacity={0.7}
              key={`cell-${entry.traderType}`}
              name={`${_.startCase(entry.traderType)}s`}
            />
          ))}
        </Pie>
        <Legend height={36} verticalAlign="top" />
        <Tooltip content={<TraderBreakdownTooltip />} />
      </PieChart>
    </ChartContainer>
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
