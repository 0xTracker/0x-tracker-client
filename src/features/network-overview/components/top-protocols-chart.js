import _ from 'lodash';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import ChartContainer from '../../../components/chart-container';
import ChartLegendText from '../../../components/chart-legend-text';
import TopProtocolsChartTooltip from './top-protocols-chart-tooltip';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Number from '../../../components/number';

const SEGMENT_COLORS = [
  COLORS.PRIMARY.SCAMPI_100,
  COLORS.PRIMARY.SCAMPI_400,
  COLORS.PRIMARY.SCAMPI_700,
  COLORS.PRIMARY.SCAMPI_1000,
];

const TopProtocolsChart = ({ data, sortBy }) => {
  if (_.isEmpty(data)) {
    return 'No data available';
  }

  return (
    <ChartContainer>
      <PieChart margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
        <Pie
          data={data}
          dataKey={sortBy === 'fillCount' ? 'tradeCount' : 'tradeVolume'}
          nameKey="protocolVersion"
          outerRadius="100%"
          paddingAngle={0}
        >
          {data.map((entry, index) => (
            <Cell
              fill={SEGMENT_COLORS[index]}
              key={`cell-${entry.protocolVersion}`}
              name={`v${entry.protocolVersion}`}
            />
          ))}
        </Pie>
        <Legend
          align="right"
          formatter={(value, entry, index) =>
            ChartLegendText(
              <span>
                {value} -{' '}
                {sortBy === 'fillVolume' ? (
                  <LocalisedAmount amount={data[index].tradeVolume} summarize />
                ) : (
                  <Number summarize>{data[index].tradeCount}</Number>
                )}
              </span>,
            )
          }
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
        />
        <Tooltip content={<TopProtocolsChartTooltip />} />
      </PieChart>
    </ChartContainer>
  );
};

TopProtocolsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      protocolVersion: PropTypes.number.isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default TopProtocolsChart;
