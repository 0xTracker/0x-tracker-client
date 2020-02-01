import _ from 'lodash';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import ChartPlaceholder from '../../../components/chart-placeholder';
import formatDate from '../../../util/format-date';
import NetworkMetricsTooltip from './network-metrics-tooltip';

const formatAxisDate = date => formatDate(date, DATE_FORMAT.COMPACT);

const formatPercentage = amount => `${Math.floor(amount)}%`;

// eslint-disable-next-line react/display-name
const ProtocolMetricsChart = React.memo(({ currency, data, onBrushChange }) => {
  if (_.isEmpty(data)) {
    return <ChartPlaceholder>No data available</ChartPlaceholder>;
  }

  const sanitizedData = data.map(dataPoint => ({
    ...dataPoint,
    date: dataPoint.date.toISOString(),
  }));

  const COLORS = [colors.martinique, colors.lavenderGray, colors.haiti];

  return (
    <ResponsiveContainer>
      <LineChart
        data={sanitizedData}
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        {[1, 2, 3].map((protocolVersion, index) => (
          <Line
            animationDuration={0}
            dataKey={dataPoint => {
              const total = _.sum(dataPoint.stats.map(x => x.fillVolume));
              const stat = dataPoint.stats.find(
                x => x.protocolVersion === protocolVersion,
              );

              if (stat === undefined) {
                return 0;
              }

              return (stat.fillVolume / total) * 100;
            }}
            key={protocolVersion}
            type="monotone"
            connectNulls={true}
            dot={false}
            stroke={COLORS[index]}
            strokeWidth={2}
          />
        ))}
        <XAxis
          axisLine={false}
          dataKey="date"
          minTickGap={60}
          tick={{ fill: 'currentColor', fontSize: '0.9em' }}
          tickFormatter={formatAxisDate}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          domain={[0, 100]}
          mirror
          tick={{ fill: 'currentColor', fontSize: '0.9em' }}
          tickFormatter={formatPercentage}
          tickLine={false}
        />
        <Tooltip content={<NetworkMetricsTooltip currency={currency} />} />
        <Brush
          dataKey="date"
          height={30}
          onChange={onBrushChange}
          stroke={colors.periwinkleGray}
          tickFormatter={formatAxisDate}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

ProtocolMetricsChart.propTypes = {
  currency: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
    }),
  ).isRequired,
  onBrushChange: PropTypes.func,
};

ProtocolMetricsChart.defaultProps = {
  onBrushChange: undefined,
};

export default ProtocolMetricsChart;
