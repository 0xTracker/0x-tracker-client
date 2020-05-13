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
import React from 'react';
import PropTypes from 'prop-types';

import { COLORS } from '../../../styles/constants';
import { formatAxisCurrency, formatAxisDate, formatAxisNumber } from '../util';
import ChartContainer from '../../../components/chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';
import TokenMetricsTooltip from './token-metrics-tooltip';

const isEmpty = (data, metric) => {
  if (_.isEmpty(data)) {
    return true;
  }

  if (metric === 'tradeCount') {
    return data.every((dataPoint) => dataPoint.tradeCount === 0);
  }

  if (metric === 'tradeVolume.USD') {
    return data.every((dataPoint) => dataPoint.tradeVolume.USD === 0);
  }

  return false;
};

const TokenMetricsChart = ({
  data,
  granularity,
  localCurrency,
  onBrushChange,
  period,
  tokenSymbol,
  type,
}) => {
  if (isEmpty(data, type)) {
    return (
      <ChartPlaceholder>
        No data available for the selected period
      </ChartPlaceholder>
    );
  }

  return (
    <ChartContainer>
      <BarChart data={data} margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
        <CartesianGrid
          stroke={COLORS.NEUTRAL.MYSTIC_200}
          strokeDasharray="8 8"
          strokeOpacity={0.7}
          vertical={false}
        />
        <Bar dataKey={type} fill={COLORS.ACCENT.ANZAC_500} fillOpacity={0.9} />
        <XAxis
          axisLine={false}
          dataKey="date"
          minTickGap={60}
          tick={{ fill: COLORS.NEUTRAL.MYSTIC_700, fontSize: '0.8em' }}
          tickFormatter={(date) => formatAxisDate(date, period, granularity)}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          dataKey={type}
          mirror
          scale="linear"
          tick={{
            fill: COLORS.PRIMARY.SCAMPI_800,
            fontSize: '0.8em',
            fontWeight: 500,
          }}
          tickFormatter={
            type === 'tradeCount'
              ? formatAxisNumber
              : (value) => formatAxisCurrency(value, localCurrency)
          }
          tickLine={false}
        />
        <Tooltip
          content={
            <TokenMetricsTooltip
              granularity={granularity}
              localCurrency={localCurrency}
              tokenSymbol={tokenSymbol}
            />
          }
        />
        <Brush
          dataKey="date"
          height={30}
          onChange={onBrushChange}
          stroke={COLORS.NEUTRAL.MYSTIC_300}
          tickFormatter={(date) => formatAxisDate(date, period, granularity)}
        />
      </BarChart>
    </ChartContainer>
  );
};

TokenMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.object.isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.shape({
        USD: PropTypes.number.isRequired,
        token: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  granularity: PropTypes.string.isRequired,
  localCurrency: PropTypes.string.isRequired,
  onBrushChange: PropTypes.func,
  period: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
  type: PropTypes.string,
};

TokenMetricsChart.defaultProps = {
  onBrushChange: undefined,
  type: 'tradeVolume.USD',
};

export default TokenMetricsChart;
