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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import ChartContainer from '../../../components/chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';
import formatDate from '../../../util/format-date';
import summarizeCurrency from '../../../util/summarize-currency';
import summarizeNumber from '../../../util/summarize-number';
import TokenMetricsTooltip from './token-metrics-tooltip';

const formatAxisDate = (date) => formatDate(date, DATE_FORMAT.COMPACT);

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

class TokenMetricsChart extends PureComponent {
  constructor() {
    super();

    this.formatValue = this.formatValue.bind(this);
  }

  formatValue(value) {
    const { localCurrency, type } = this.props;

    if (value === 0) {
      return '';
    }

    if (type === 'tradeCount') {
      return summarizeNumber(value);
    }

    return summarizeCurrency(value, localCurrency);
  }

  render() {
    const {
      data,
      localCurrency,
      onBrushChange,
      tokenSymbol,
      type,
    } = this.props;

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
            stroke={colors.athensGray}
            strokeDasharray="8 8"
            strokeOpacity={0.7}
            vertical={false}
          />
          <Bar
            animationDuration={0}
            dataKey={type}
            fill={colors.anzac}
            fillOpacity={0.9}
          />
          <XAxis
            axisLine={false}
            dataKey="date"
            minTickGap={60}
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
            tickFormatter={this.formatValue}
            tickLine={false}
          />
          <Tooltip
            content={
              <TokenMetricsTooltip
                localCurrency={localCurrency}
                tokenSymbol={tokenSymbol}
              />
            }
          />
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
  }
}

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
  localCurrency: PropTypes.string.isRequired,
  onBrushChange: PropTypes.func,
  tokenSymbol: PropTypes.string.isRequired,
  type: PropTypes.string,
};

TokenMetricsChart.defaultProps = {
  onBrushChange: undefined,
  type: 'tradeVolume.USD',
};

export default TokenMetricsChart;
