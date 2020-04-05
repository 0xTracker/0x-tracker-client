import _ from 'lodash';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { protocolColors } from '../../../styles/constants';
import ChartContainer from '../../../components/chart-container';
import TopProtocolsChartTooltip from './top-protocols-chart-tooltip';

const TopProtocolsChart = ({ data }) => {
  if (_.isEmpty(data)) {
    return 'No data available';
  }

  return (
    <ChartContainer>
      <PieChart isAnimationActive={false}>
        <Pie
          data={data}
          dataKey="fillCount"
          isAnimationActive={false}
          label={false}
          nameKey="protocolVersion"
          paddingAngle={0}
        >
          {data.map((entry) => (
            <Cell
              fill={protocolColors[entry.protocolVersion]}
              fillOpacity={0.7}
              key={`cell-${entry.protocolVersion}`}
              name={`v${entry.protocolVersion}`}
            />
          ))}
        </Pie>
        <Legend height={36} verticalAlign="top" />
        <Tooltip content={<TopProtocolsChartTooltip />} />
      </PieChart>
    </ChartContainer>
  );
};

TopProtocolsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      fillCount: PropTypes.number.isRequired,
      protocolVersion: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TopProtocolsChart;
