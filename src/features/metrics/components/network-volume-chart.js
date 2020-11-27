import _ from 'lodash';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Brush,
} from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { formatAxisCurrency, formatAxisDate, formatAxisNumber } from '../util';
import { getGranularityForMetrics } from '../../../util';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import CardPlaceholder from '../../../components/card-placeholder';
import NetworkVolumeTooltip from './network-volume-tooltip';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const NetworkVolumeChart = ({ data, period, type }) => {
  const displayCurrency = useDisplayCurrency();

  if (_.every(data, { [type]: 0 })) {
    return (
      <CardPlaceholder>
        No data available for the selected period
      </CardPlaceholder>
    );
  }

  const granularity = getGranularityForMetrics(data);

  return (
    <BrushableChartContainer data={data}>
      {({ brushIndexes, brushableData, handleBrushChange }) => (
        <ComposedChart
          baseValue="dataMin"
          data={brushableData}
          margin={{ bottom: 0, left: 0, right: 0, top: 40 }}
        >
          <CartesianGrid
            stroke={COLORS.NEUTRAL.MYSTIC_300}
            strokeDasharray="8 8"
            strokeOpacity={0.7}
            vertical={false}
          />
          <Bar
            animationDuration={0}
            dataKey={type}
            fill={COLORS.NEUTRAL.MYSTIC_400}
            yAxisId={type}
          />
          <Line
            animationDuration={0}
            dataKey="avgTradeSize"
            dot={false}
            stroke={COLORS.ACCENT.ANZAC_500}
            strokeWidth={1}
            type="monotone"
            yAxisId="avgTradeSize"
          />
          <XAxis
            axisLine={{ stroke: COLORS.NEUTRAL.MYSTIC_300 }}
            dataKey="date"
            tick={{ fill: COLORS.NEUTRAL.MYSTIC_800, fontSize: '0.8em' }}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
            tickLine={false}
          />
          <YAxis
            allowDuplicatedCategory={false}
            axisLine={false}
            dataKey={type}
            label={{
              fill: COLORS.NEUTRAL.MYSTIC_700,
              fillOpacity: 0.6,
              fontSize: '0.7rem',
              fontWeight: 500,
              offset: 30,
              position: 'top',
              value: type === 'tradeVolume' ? 'VOLUME' : 'TRADES',
            }}
            mirror
            tick={{
              fill: COLORS.PRIMARY.SCAMPI_800,
              fontSize: '0.8em',
              fontWeight: 500,
            }}
            tickFormatter={
              type === 'tradeVolume'
                ? (value) => formatAxisCurrency(value, displayCurrency)
                : formatAxisNumber
            }
            tickLine={false}
            yAxisId={type}
          />
          <YAxis
            allowDuplicatedCategory={false}
            axisLine={false}
            dataKey="avgTradeSize"
            label={{
              fill: COLORS.ACCENT.ANZAC_500,
              fontSize: '0.7rem',
              fontWeight: 500,
              offset: 30,
              position: 'top',
              value: 'AVG SIZE',
            }}
            mirror
            orientation="right"
            tick={{
              fill: COLORS.PRIMARY.SCAMPI_800,
              fontSize: '0.8em',
              fontWeight: 500,
            }}
            tickFormatter={(value) =>
              formatAxisCurrency(value, displayCurrency)
            }
            tickLine={false}
            yAxisId="avgTradeSize"
          />
          <Tooltip
            content={
              <NetworkVolumeTooltip
                currency={displayCurrency}
                granularity={granularity}
              />
            }
          />
          <Brush
            {...brushIndexes}
            dataKey="date"
            height={30}
            onChange={handleBrushChange}
            stroke={COLORS.NEUTRAL.MYSTIC_400}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
          />
        </ComposedChart>
      )}
    </BrushableChartContainer>
  );
};

NetworkVolumeChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  period: PropTypes.string.isRequired,
  type: PropTypes.string,
};

NetworkVolumeChart.defaultProps = {
  type: 'tradeVolume',
};

export default NetworkVolumeChart;
