import _ from 'lodash';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from 'recharts';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import ActiveTraderMetricsTooltip from './active-trader-metrics-tooltip';
import ChartPlaceholder from '../../../components/chart-placeholder';
import formatDate from '../../../util/format-date';

const formatAxisDate = date => formatDate(date, DATE_FORMAT.COMPACT);

const formatNumber = value => {
  if (value === 0) {
    return '';
  }

  return numeral(value).format('0,0');
};

const ActiveTraderMetricsChart = React.memo(({ data, onBrushChange }) => {
  if (_.isEmpty(data)) {
    return <ChartPlaceholder>No data available</ChartPlaceholder>;
  }

  const sanitizedData = data.map(dataPoint => ({
    ...dataPoint,
    date: dataPoint.date.toISOString(),
  }));

  return (
    <ResponsiveContainer>
      <AreaChart
        data={sanitizedData}
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        <Area
          animationDuration={0}
          dataKey="traderCount"
          fill={colors.periwinkleGray}
          fillOpacity={1}
          stroke={colors.indigo}
          strokeOpacity={0.6}
          strokeWidth={2}
          type="monotone"
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
          dataKey="traderCount"
          minTickGap={20}
          mirror
          padding={{ top: 25 }}
          tick={{ fill: 'currentColor', fontSize: '0.9em' }}
          tickFormatter={formatNumber}
          tickLine={false}
        />
        <Tooltip content={<ActiveTraderMetricsTooltip />} />
        <Brush
          dataKey="date"
          height={30}
          onChange={onBrushChange}
          stroke={colors.periwinkleGray}
          tickFormatter={formatAxisDate}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});

ActiveTraderMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      makerCount: PropTypes.number.isRequired,
      takerCount: PropTypes.number.isRequired,
      traderCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onBrushChange: PropTypes.func,
};

ActiveTraderMetricsChart.defaultProps = {
  onBrushChange: undefined,
};

ActiveTraderMetricsChart.displayName = 'ActiveTraderMetricsChart';

export default ActiveTraderMetricsChart;
