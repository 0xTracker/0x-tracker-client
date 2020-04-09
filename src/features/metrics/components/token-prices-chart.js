import _ from 'lodash';
import {
  Bar,
  CartesianGrid,
  Line,
  ComposedChart,
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
import TokenPricesTooltip from './token-prices-tooltip';

const formatAxisDate = (date) => formatDate(date, DATE_FORMAT.COMPACT);

class TokenPricesChart extends PureComponent {
  constructor() {
    super();

    this.formatValue = this.formatValue.bind(this);
  }

  formatValue(value) {
    if (value === 0) {
      return '';
    }

    const { localCurrency } = this.props;

    return summarizeCurrency(value, localCurrency);
  }

  render() {
    const { data, localCurrency, onBrushChange, tokenSymbol } = this.props;

    if (_.isEmpty(data)) {
      return <ChartPlaceholder>No data available</ChartPlaceholder>;
    }

    return (
      <ChartContainer>
        <ComposedChart
          data={data}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <CartesianGrid
            stroke={colors.athensGray}
            strokeDasharray="8 8"
            strokeOpacity={0.7}
            vertical={false}
          />
          <Bar
            dataKey="tradeVolume.USD"
            fill={colors.mischka}
            fillOpacity={1}
            yAxisId="volume"
          />
          <Line
            dataKey="price.close"
            dot={false}
            stroke={colors.anzac}
            strokeWidth={2}
            type="monotone"
            yAxisId="price"
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
            dataKey="price.close"
            label={{
              fill: colors.anzac,
              fillOpacity: 0.7,
              fontSize: '0.7rem',
              fontWeight: 'bold',
              position: 'insideTopLeft',
              value: 'PRICE',
            }}
            mirror
            padding={{ top: 40 }}
            tick={{
              fill: 'currentColor',
              fontSize: '0.8em',
              fontWeight: 'bold',
            }}
            tickFormatter={this.formatValue}
            tickLine={false}
            yAxisId="price"
          />
          <YAxis
            axisLine={false}
            dataKey="tradeVolume.USD"
            label={{
              fill: colors.mischka,
              fillOpacity: 0.8,
              fontSize: '0.7rem',
              fontWeight: 'bold',
              position: 'insideTopRight',
              value: 'VOLUME',
            }}
            mirror
            orientation="right"
            padding={{ top: 40 }}
            tick={{
              fill: 'currentColor',
              fontSize: '0.8em',
              fontWeight: 'bold',
            }}
            tickFormatter={this.formatValue}
            tickLine={false}
            yAxisId="volume"
          />
          <Tooltip
            content={
              <TokenPricesTooltip
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
        </ComposedChart>
      </ChartContainer>
    );
  }
}

TokenPricesChart.propTypes = {
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
};

TokenPricesChart.defaultProps = {
  onBrushChange: undefined,
};

export default TokenPricesChart;
