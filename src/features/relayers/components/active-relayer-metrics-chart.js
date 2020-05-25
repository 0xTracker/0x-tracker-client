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
import ActiveRelayerMetricsTooltip from './active-relayer-metrics-tooltip';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';

const ActiveRelayerMetricsChart = ({ data, granularity, period }) => {
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
            stroke={COLORS.NEUTRAL.MYSTIC_200}
            strokeDasharray="8 8"
            strokeOpacity={0.7}
            vertical={false}
          />
          <Bar dataKey="activeRelayers" fill={COLORS.ACCENT.ANZAC_500} />
          <XAxis
            axisLine={{ stroke: COLORS.NEUTRAL.MYSTIC_200 }}
            dataKey="date"
            tick={{ fill: COLORS.NEUTRAL.MYSTIC_700, fontSize: '0.8em' }}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            dataKey="activeRelayers"
            mirror
            scale="linear"
            tick={{
              fill: COLORS.PRIMARY.SCAMPI_800,
              fontSize: '0.8em',
              fontWeight: 500,
            }}
            tickFormatter={formatAxisNumber}
            tickLine={false}
          />
          <Tooltip
            content={<ActiveRelayerMetricsTooltip granularity={granularity} />}
          />
          <Brush
            {...brushIndexes}
            dataKey="date"
            height={30}
            onChange={handleBrushChange}
            stroke={COLORS.NEUTRAL.MYSTIC_300}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
          />
        </BarChart>
      )}
    </BrushableChartContainer>
  );
};

ActiveRelayerMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      activeRelayers: PropTypes.number.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
    }),
  ).isRequired,
  granularity: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
};

export default ActiveRelayerMetricsChart;
