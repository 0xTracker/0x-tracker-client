import _ from 'lodash';
import { Area, AreaChart, XAxis, Tooltip, Brush, Legend } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { formatAxisDate } from '../util';
import ChartContainer from '../../../components/chart-container';
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

// eslint-disable-next-line react/display-name
const ProtocolMetricsChart = React.memo(
  ({ currency, data, granularity, onBrushChange, period }) => {
    if (_.isEmpty(data)) {
      return <ChartPlaceholder>No data available</ChartPlaceholder>;
    }

    const sanitizedData = data.map((dataPoint) => ({
      ...dataPoint,
      date: dataPoint.date.toISOString(),
    }));

    return (
      <ChartContainer>
        <AreaChart
          data={sanitizedData}
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
            tick={{ fill: COLORS.NEUTRAL.MYSTIC_700, fontSize: '0.8em' }}
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
              dataKey={(dataPoint) => {
                const total = _.sum(dataPoint.stats.map((x) => x.fillCount));
                const stat = dataPoint.stats.find(
                  (x) => x.protocolVersion === protocolVersion,
                );

                if (stat === undefined) {
                  return 0;
                }

                return (stat.fillCount / total) * 100;
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
          <Brush
            dataKey="date"
            height={30}
            onChange={onBrushChange}
            stroke={COLORS.NEUTRAL.MYSTIC_300}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
          />
        </AreaChart>
      </ChartContainer>
    );
  },
);

ProtocolMetricsChart.propTypes = {
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
  onBrushChange: PropTypes.func,
  period: PropTypes.string.isRequired,
};

ProtocolMetricsChart.defaultProps = {
  onBrushChange: undefined,
};

export default ProtocolMetricsChart;
