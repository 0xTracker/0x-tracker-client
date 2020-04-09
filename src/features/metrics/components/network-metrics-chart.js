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

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import ChartContainer from '../../../components/chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';
import formatDate from '../../../util/format-date';
import NetworkMetricsTooltip from './network-metrics-tooltip';
import summarizeCurrency from '../../../util/summarize-currency';
import summarizeNumber from '../../../util/summarize-number';

const formatAxisDate = (date) => formatDate(date, DATE_FORMAT.COMPACT);

const formatCount = (count) => {
  if (count === 0) {
    return '';
  }

  return summarizeNumber(count);
};

const NetworkMetricsChart = React.memo(
  ({ currency, data, onBrushChange, type }) => {
    const formatCurrency = (amount) => {
      if (amount === 0) {
        return '';
      }

      return summarizeCurrency(amount, currency);
    };

    if (_.isEmpty(data)) {
      return <ChartPlaceholder>No data available</ChartPlaceholder>;
    }

    const sanitizedData = data.map((dataPoint) => ({
      ...dataPoint,
      date: dataPoint.date.toISOString(),
    }));

    return (
      <ChartContainer>
        <BarChart data={sanitizedData}>
          <CartesianGrid
            stroke={colors.athensGray}
            strokeDasharray="8 8"
            strokeOpacity={0.7}
            vertical={false}
          />
          <Bar dataKey={type} fill={colors.anzac} fillOpacity={0.9} />
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
            dataKey={type}
            mirror
            tick={{
              fill: 'currentColor',
              fontSize: '0.8em',
              fontWeight: 'bold',
            }}
            tickFormatter={
              type === 'tradeVolume' || type === 'protocolFees'
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
            stroke={colors.mischka}
            tickFormatter={formatAxisDate}
          />
        </BarChart>
      </ChartContainer>
    );
  },
);

NetworkMetricsChart.propTypes = {
  currency: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
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
  type: 'tradeVolume',
};

NetworkMetricsChart.displayName = 'NetworkMetricsChart';

export default NetworkMetricsChart;
