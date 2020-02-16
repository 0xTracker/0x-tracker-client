import _ from 'lodash';
import { Bar, BarChart, XAxis, YAxis, Tooltip, Brush, Legend } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { colors, protocolColors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import ChartContainer from '../../../components/chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';
import formatDate from '../../../util/format-date';
import ProtocolMetricsTooltip from './protocol-metrics-tooltip';

const formatAxisDate = date => formatDate(date, DATE_FORMAT.COMPACT);
const formatPercentage = amount => `${Math.floor(amount)}%`;

const getProtocols = data =>
  _.uniq(
    _.flatten(data.map(dataPoint => dataPoint.stats))
      .filter(stat => stat.fillCount > 0)
      .map(stat => stat.protocolVersion),
  ).sort();

// eslint-disable-next-line react/display-name
const ProtocolMetricsChart = React.memo(({ currency, data, onBrushChange }) => {
  if (_.isEmpty(data)) {
    return <ChartPlaceholder>No data available</ChartPlaceholder>;
  }

  const sanitizedData = data.map(dataPoint => ({
    ...dataPoint,
    date: dataPoint.date.toISOString(),
  }));

  return (
    <ChartContainer>
      <BarChart
        data={sanitizedData}
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        <Tooltip
          content={<ProtocolMetricsTooltip currency={currency} />}
          cursor={false}
        />
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
          tick={{ fill: 'currentColor', fontSize: '0.9em' }}
          tickFormatter={formatPercentage}
          tickLine={false}
        />
        <Brush
          dataKey="date"
          height={30}
          onChange={onBrushChange}
          stroke={colors.periwinkleGray}
          tickFormatter={formatAxisDate}
        />
        <Legend height={36} verticalAlign="top" />
        {getProtocols(data).map(protocolVersion => (
          <Bar
            animationDuration={0}
            dataKey={dataPoint => {
              const total = _.sum(dataPoint.stats.map(x => x.fillCount));
              const stat = dataPoint.stats.find(
                x => x.protocolVersion === protocolVersion,
              );

              if (stat === undefined) {
                return 0;
              }

              return (stat.fillCount / total) * 100;
            }}
            fill={protocolColors[protocolVersion]}
            fillOpacity={0.7}
            key={protocolVersion}
            name={`v${protocolVersion}`}
            stackId={1}
            strokeWidth={0}
            type="monotone"
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
});

ProtocolMetricsChart.propTypes = {
  currency: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      stats: PropTypes.arrayOf(
        PropTypes.shape({
          fillCount: PropTypes.number.isRequired,
          fillVolume: PropTypes.number.isRequired,
          protocolVersion: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  onBrushChange: PropTypes.func,
};

ProtocolMetricsChart.defaultProps = {
  onBrushChange: undefined,
};

export default ProtocolMetricsChart;
