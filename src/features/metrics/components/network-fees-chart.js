import {
  Area,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Text,
  Tooltip,
} from 'recharts';
import { format as formatDate } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';

import formatCurrency from '../../../util/format-currency';
import NetworkFeesTooltip from './network-fees-tooltip';
import padMetrics from '../util/pad-metrics';
import sharedPropTypes from '../../../prop-types';

const formatAxisDate = date => formatDate(date, 'MMM DD');

const NetworkFeesChart = ({ data, displayCurrency, period }) => {
  const paddedMetrics = padMetrics(data, period, {
    fees: '0',
    localizedFees: 0,
  });
  const sanitizedData = paddedMetrics.map(dataPoint => ({
    ...dataPoint,
    date: dataPoint.date.toISOString(),
  }));

  const formatYAxis = amount =>
    amount === 0 ? '' : formatCurrency(amount, displayCurrency);

  return (
    <ResponsiveContainer>
      <AreaChart
        data={sanitizedData}
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <Text>No data available for time period</Text>

        <Area
          animationDuration={0}
          dataKey="localizedFees"
          fill="#99BEBD"
          fillOpacity={1}
          stroke="none"
          type="monotone"
        />
        <XAxis
          axisLine={false}
          dataKey="date"
          minTickGap={60}
          tickFormatter={formatAxisDate}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          dataKey="localizedFees"
          minTickGap={20}
          mirror
          padding={{ top: 25 }}
          tickFormatter={formatYAxis}
          tickLine={false}
        />
        <Tooltip content={<NetworkFeesTooltip currency={displayCurrency} />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

NetworkFeesChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      fees: PropTypes.string.isRequired,
      localizedFees: PropTypes.number.isRequired,
    }),
  ).isRequired,
  displayCurrency: PropTypes.string.isRequired,
  period: sharedPropTypes.timePeriod.isRequired,
};

export default NetworkFeesChart;
