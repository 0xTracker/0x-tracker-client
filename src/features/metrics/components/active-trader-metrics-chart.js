import _ from 'lodash';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { formatAxisDate, formatAxisNumber } from '../util';
import ActiveTraderMetricsTooltip from './active-trader-metrics-tooltip';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';

const ActiveTraderMetricsChart = ({ data, granularity, period, type }) => {
  if (_.isEmpty(data)) {
    return <ChartPlaceholder>No data available</ChartPlaceholder>;
  }

  return (
    <BrushableChartContainer data={data}>
      {({ brushIndexes, brushableData, handleBrushChange }) => (
        <BarChart
          data={brushableData}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <CartesianGrid
            horizontalCoordinatesGenerator={({ yAxis }) => {
              const hundredth = yAxis.height / 100;

              return [20, 40, 60, 80].map((x) => hundredth * x + yAxis.y); // 20%, 40%, 60%, 80%
            }}
            stroke={COLORS.NEUTRAL.MYSTIC_300}
            strokeDasharray="8 8"
            strokeOpacity={0.7}
            vertical={false}
          />
          <Bar dataKey={type} fill={COLORS.ACCENT.ANZAC_500} />
          <XAxis
            axisLine={{ stroke: COLORS.NEUTRAL.MYSTIC_300 }}
            dataKey="date"
            tick={{ fill: COLORS.NEUTRAL.MYSTIC_800, fontSize: '0.8em' }}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            dataKey={type}
            mirror
            tick={{
              fill: COLORS.PRIMARY.SCAMPI_800,
              fontSize: '0.8em',
              fontWeight: 500,
            }}
            tickCount={6}
            tickFormatter={(value, index) => {
              if (index === 0 || index === 5) {
                return '';
              }

              return formatAxisNumber(value);
            }}
            tickLine={false}
          />
          <Tooltip
            content={<ActiveTraderMetricsTooltip granularity={granularity} />}
          />
          <Brush
            {...brushIndexes}
            dataKey="date"
            height={30}
            onChange={handleBrushChange}
            stroke={COLORS.NEUTRAL.MYSTIC_400}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
          />
        </BarChart>
      )}
    </BrushableChartContainer>
  );
};

ActiveTraderMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      makerCount: PropTypes.number.isRequired,
      takerCount: PropTypes.number.isRequired,
      traderCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
  granularity: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ActiveTraderMetricsChart;
