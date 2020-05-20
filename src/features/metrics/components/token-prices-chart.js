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
import React from 'react';
import PropTypes from 'prop-types';

import { COLORS } from '../../../styles/constants';
import { formatAxisCurrency, formatAxisDate } from '../util';
import CardPlaceholder from '../../../components/card-placeholder';
import ChartContainer from '../../../components/chart-container';
import TokenPricesTooltip from './token-prices-tooltip';

const getDomainForPriceAxis = (prices) => {
  const high = _.max(prices);
  const low = _.min(prices);
  const range = high - low;

  if (range === 0) {
    return [low, high]; // TODO: Improve later
  }

  const buffer = range / 2;

  return [low - buffer, high + buffer];
};

const TokenPricesChart = ({
  data,
  granularity,
  localCurrency,
  onBrushChange,
  period,
  tokenSymbol,
}) => {
  if (
    _.isEmpty(data) ||
    data.every((dataPoint) => dataPoint.price.close === null)
  ) {
    return (
      <CardPlaceholder>
        No data available for the selected period
      </CardPlaceholder>
    );
  }

  const prices = data.map((x) => x.price.close);
  const domain = getDomainForPriceAxis(prices);

  return (
    <ChartContainer>
      <ComposedChart
        data={data}
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        <CartesianGrid
          stroke={COLORS.NEUTRAL.MYSTIC_200}
          strokeDasharray="8 8"
          strokeOpacity={0.7}
          vertical={false}
        />
        <Bar
          dataKey="tradeVolume.USD"
          fill={COLORS.NEUTRAL.MYSTIC_300}
          fillOpacity={1}
          yAxisId="volume"
        />
        <Line
          dataKey="price.close"
          dot={false}
          stroke={COLORS.ACCENT.ANZAC_600}
          strokeWidth={2}
          type="monotone"
          yAxisId="price"
        />
        <XAxis
          axisLine={false}
          dataKey="date"
          minTickGap={25}
          tick={{ fill: COLORS.NEUTRAL.MYSTIC_700, fontSize: '0.8em' }}
          tickFormatter={(date) => formatAxisDate(date, period, granularity)}
          tickLine={false}
        />
        <YAxis
          allowDuplicatedCategory={false}
          axisLine={false}
          dataKey="price.close"
          domain={domain}
          label={{
            fill: COLORS.ACCENT.ANZAC_600,
            fillOpacity: 0.6,
            fontSize: '0.7rem',
            fontWeight: 500,
            position: 'insideTopLeft',
            value: 'PRICE',
          }}
          mirror
          padding={{ top: 40 }}
          scale="linear"
          tick={{
            fill: COLORS.PRIMARY.SCAMPI_800,
            fontSize: '0.8em',
            fontWeight: 500,
          }}
          tickFormatter={(value) => formatAxisCurrency(value, localCurrency)}
          tickLine={false}
          yAxisId="price"
        />
        <YAxis
          allowDuplicatedCategory={false}
          axisLine={false}
          dataKey="tradeVolume.USD"
          label={{
            fill: COLORS.NEUTRAL.MYSTIC_300,
            fontSize: '0.7rem',
            fontWeight: 500,
            position: 'insideTopRight',
            value: 'VOLUME',
          }}
          mirror
          orientation="right"
          padding={{ top: 40 }}
          scale="linear"
          tick={{
            fill: COLORS.PRIMARY.SCAMPI_800,
            fontSize: '0.8em',
            fontWeight: 500,
          }}
          tickFormatter={(value) => formatAxisCurrency(value, localCurrency)}
          tickLine={false}
          yAxisId="volume"
        />
        <Tooltip
          content={
            <TokenPricesTooltip
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
      </ComposedChart>
    </ChartContainer>
  );
};

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
  granularity: PropTypes.string.isRequired,
  localCurrency: PropTypes.string.isRequired,
  onBrushChange: PropTypes.func,
  period: PropTypes.string.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
};

TokenPricesChart.defaultProps = {
  onBrushChange: undefined,
};

export default TokenPricesChart;
