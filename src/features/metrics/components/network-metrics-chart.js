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
import ChartPlaceholder from '../../../components/chart-placeholder';
import formatDate from '../../../util/format-date';
import NetworkMetricsTooltip from './network-metrics-tooltip';
import summarizeCurrency from '../../../util/summarize-currency';

const formatAxisDate = date => formatDate(date, DATE_FORMAT.COMPACT);

const formatCount = count => {
  if (count === 0) {
    return '';
  }

  return numeral(count).format('0,0');
};

const NetworkMetricsChart = React.memo(
  ({ currency, data, onBrushChange, type }) => {
    const formatCurrency = amount => {
      if (amount === 0) {
        return '';
      }

      return summarizeCurrency(amount, currency);
    };

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
            dataKey={type}
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
            dataKey={type}
            minTickGap={20}
            mirror
            padding={{ top: 25 }}
            tick={{ fill: 'currentColor', fontSize: '0.9em' }}
            tickFormatter={
              type === 'fillVolume' ||
              type === 'tradeVolume' ||
              type === 'protocolFees'
                ? formatCurrency
                : formatCount
            }
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
        </AreaChart>
      </ResponsiveContainer>
    );
  },
);

NetworkMetricsChart.propTypes = {
  currency: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      fillCount: PropTypes.number.isRequired,
      fillVolume: PropTypes.number.isRequired,
      protocolFees: {
        ETH: PropTypes.string.isRequired,
        USD: PropTypes.number.isRequired,
      },
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onBrushChange: PropTypes.func,
  type: PropTypes.string,
};

NetworkMetricsChart.defaultProps = {
  onBrushChange: undefined,
  type: 'fillVolume',
};

NetworkMetricsChart.displayName = 'NetworkMetricsChart';

export default NetworkMetricsChart;
