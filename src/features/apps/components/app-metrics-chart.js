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
import { formatAxisDate, formatAxisNumber } from '../../metrics/util';
import AppMetricsTooltip from './app-metrics-tooltip';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import CardPlaceholder from '../../../components/card-placeholder';

const AppMetricsChart = ({ data, granularity, period }) => {
  if (_.every(data, { activeTraders: 0 })) {
    return (
      <CardPlaceholder>
        No data available for the selected period
      </CardPlaceholder>
    );
  }

  return (
    <BrushableChartContainer data={data}>
      {({ brushableData, brushIndexes, handleBrushChange }) => (
        <BarChart
          data={brushableData}
          margin={{ bottom: 0, left: 0, right: 0, top: 10 }}
        >
          <CartesianGrid
            stroke={COLORS.NEUTRAL.MYSTIC_300}
            strokeDasharray="8 8"
            strokeOpacity={0.7}
            vertical={false}
          />
          <Bar
            animationDuration={0}
            dataKey="activeTraders"
            fill={COLORS.ACCENT.ANZAC_500}
          />
          <XAxis
            axisLine={{ stroke: COLORS.NEUTRAL.MYSTIC_300 }}
            dataKey="date"
            minTickGap={25}
            tick={{ fill: COLORS.NEUTRAL.MYSTIC_800, fontSize: '0.8em' }}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            dataKey="activeTraders"
            mirror
            tick={{
              fill: COLORS.PRIMARY.SCAMPI_800,
              fontSize: '0.8em',
              fontWeight: 500,
            }}
            tickFormatter={formatAxisNumber}
            tickLine={false}
          />
          <Tooltip content={<AppMetricsTooltip granularity={granularity} />} />
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

AppMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      activeTraders: PropTypes.number.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  granularity: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
};

export default AppMetricsChart;
