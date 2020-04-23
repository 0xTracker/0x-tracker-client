import _ from 'lodash';
import { Legend, PieChart, Pie, Cell, Tooltip } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import ChartContainer from '../../../components/chart-container';
import ChartLegendText from '../../../components/chart-legend-text';
import TraderBreakdownTooltip from './trader-breakdown-tooltip';

const SEGMENT_COLORS = [COLORS.PRIMARY.SCAMPI_100, COLORS.PRIMARY.SCAMPI_400];

const TraderBreakdownChart = ({ data }) => {
  if (_.isEmpty(data)) {
    return 'No data available';
  }

  return (
    <ChartContainer>
      <PieChart margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="traderType"
          outerRadius="100%"
          paddingAngle={0}
        >
          {data.map((entry, index) => (
            <Cell
              fill={SEGMENT_COLORS[index]}
              key={`cell-${entry.traderType}`}
              name={`${_.startCase(entry.traderType)}s`}
            />
          ))}
        </Pie>
        <Legend
          align="right"
          formatter={ChartLegendText}
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
        />
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
