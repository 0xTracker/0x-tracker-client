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
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import ActiveTraderMetricsTooltip from './active-trader-metrics-tooltip';
import ChartContainer from '../../../components/chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';
import formatDate from '../../../util/format-date';

const formatAxisDate = (date) => formatDate(date, DATE_FORMAT.COMPACT);

const formatNumber = (value) => {
  if (value === 0) {
    return '';
  }

  return numeral(value).format('0,0');
};

const ActiveTraderMetricsChart = React.memo(({ data, onBrushChange }) => {
  if (_.isEmpty(data)) {
    return <ChartPlaceholder>No data available</ChartPlaceholder>;
  }

  const sanitizedData = data.map((dataPoint) => ({
    ...dataPoint,
    date: dataPoint.date.toISOString(),
  }));

  return (
    <ChartContainer>
      <BarChart
        data={sanitizedData}
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        <CartesianGrid
          stroke={colors.athensGray}
          strokeDasharray="8 8"
          strokeOpacity={0.7}
          vertical={false}
        />
        <Bar dataKey="traderCount" fill={colors.anzac} fillOpacity={0.9} />
        <XAxis
          axisLine={{ stroke: colors.athensGray }}
          dataKey="date"
          height={30}
          minTickGap={35}
          tick={{ fill: 'currentColor', fontSize: '0.8em' }}
          tickFormatter={formatAxisDate}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          dataKey="traderCount"
          mirror
          tick={{
            fill: 'currentColor',
            fontSize: '0.8em',
            fontWeight: 'bold',
          }}
          tickFormatter={formatNumber}
          tickLine={false}
        />
        <Tooltip content={<ActiveTraderMetricsTooltip />} />
        <Brush
          dataKey="date"
          height={30}
          onChange={onBrushChange}
          stroke={colors.mischka}
          tickFormatter={formatAxisDate}
        />
      </BarChart>
    </ChartContainer>
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
