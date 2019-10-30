import _ from 'lodash';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import TopProtocolsChartTooltip from './top-protocols-chart-tooltip';

const TopProtocolsChart = ({ data }) => {
  if (_.isEmpty(data)) {
    return 'No data available';
  }

  const COLORS = [colors.indigo, colors.martinique, colors.santasGray];

  return (
    <ResponsiveContainer>
      <PieChart isAnimationActive={false}>
        <Pie
          data={data}
          dataKey="share"
          isAnimationActive={false}
          label={({ protocolVersion }) => `v${protocolVersion}`}
          labelLine
          nameKey="protocolVersion"
          paddingAngle={0}
        >
          {data.map((entry, index) => (
            <Cell fill={COLORS[index]} key={`cell-${entry.protocolVersion}`} />
          ))}
        </Pie>
        <Tooltip content={<TopProtocolsChartTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

TopProtocolsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      protocolVersion: PropTypes.number.isRequired,
      share: PropTypes.number.isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TopProtocolsChart;
