import _ from 'lodash';
import {
  Area,
  AreaChart,
  XAxis,
  Tooltip,
  Brush,
  Legend,
  YAxis,
  CartesianGrid,
} from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { formatAxisDate } from '../util';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import ChartLegendText from '../../../components/chart-legend-text';
import ChartPlaceholder from '../../../components/chart-placeholder';
import ProtocolMetricsTooltip from './protocol-metrics-tooltip';

const getProtocols = (data) =>
  _.uniq(
    _.flatten(data.map((dataPoint) => dataPoint.stats))
      .filter((stat) => stat.fillCount > 0)
      .map((stat) => stat.protocolVersion),
  ).sort();

const SEGMENT_COLORS = [
  COLORS.ACCENT.FRUIT_SALAD_100,
  COLORS.ACCENT.FRUIT_SALAD_400,
  COLORS.ACCENT.FRUIT_SALAD_700,
  COLORS.ACCENT.FRUIT_SALAD_1000,
];

const ProtocolMetricsChart = ({
  compareBy,
  currency,
  data,
  granularity,
  period,
}) => {
  if (_.isEmpty(data)) {
    return <ChartPlaceholder>No data available</ChartPlaceholder>;
  }

  return (
    <BrushableChartContainer data={data}>
      {({ brushableData, brushIndexes, handleBrushChange }) => (
        <AreaChart
          data={brushableData}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <Tooltip
            content={
              <ProtocolMetricsTooltip
                currency={currency}
                granularity={granularity}
              />
            }
            cursor={false}
          />
          <XAxis
            axisLine={false}
            dataKey="date"
            tick={{ fill: COLORS.NEUTRAL.MYSTIC_800, fontSize: '0.8em' }}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
            tickLine={false}
          />
          <Legend
            formatter={ChartLegendText}
            height={36}
            iconType="circle"
            verticalAlign="top"
          />
          {getProtocols(data).map((protocolVersion, index) => (
            <Area
              animationDuration={0}
              dataKey={(dataPoint) => {
                const total = _.sum(dataPoint.stats.map((x) => x[compareBy]));
                const stat = dataPoint.stats.find(
                  (x) => x.protocolVersion === protocolVersion,
                );

                if (stat === undefined) {
                  return 0;
                }

                return Math.round((stat[compareBy] / total) * 100);
              }}
              fill={SEGMENT_COLORS[index]}
              fillOpacity={1}
              key={protocolVersion}
              name={`v${protocolVersion}`}
              stackId={1}
              stroke={SEGMENT_COLORS[index]}
              strokeWidth={0}
              type="monotone"
            />
          ))}
          <CartesianGrid
            horizontalCoordinatesGenerator={({ yAxis }) => {
              const hundredth = yAxis.height / 100;

              return [20, 40, 60, 80].map((x) => hundredth * x + yAxis.y); // 20%, 40%, 60%, 80%
            }}
            stroke="white"
            strokeDasharray="4 4"
            strokeOpacity={0.3}
            vertical={false}
          />
          <YAxis
            axisLine={false}
            domain={[20, 80]}
            mirror
            tick={{
              fill: 'white',
              fontSize: '0.8em',
              fontWeight: 300,
            }}
            tickCount={6} // 0%, 20%, 40%, 80%, 100%
            tickFormatter={
              (value) => (value === 0 || value === 100 ? '' : `${value}%`) // Hide 0% and 100%
            }
            tickLine={false}
          />
          <Brush
            {...brushIndexes}
            dataKey="date"
            height={30}
            onChange={handleBrushChange}
            stroke={COLORS.NEUTRAL.MYSTIC_400}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
          />
        </AreaChart>
      )}
    </BrushableChartContainer>
  );
};

ProtocolMetricsChart.propTypes = {
  compareBy: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      stats: PropTypes.arrayOf(
        PropTypes.shape({
          fillCount: PropTypes.number.isRequired,
          protocolVersion: PropTypes.number.isRequired,
          tradeVolume: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  granularity: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
};

export default ProtocolMetricsChart;
