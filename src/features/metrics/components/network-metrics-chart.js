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

import { COLORS } from '../../../styles/constants';
import { formatAxisCurrency, formatAxisDate, formatAxisNumber } from '../util';
import { getGranularityForMetrics } from '../../../util';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import CardPlaceholder from '../../../components/card-placeholder';
import NetworkMetricsTooltip from './network-metrics-tooltip';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const NetworkMetricsChart = ({ data, period, type }) => {
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
        <BarChart
          data={brushableData}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <CartesianGrid
            stroke={COLORS.NEUTRAL.MYSTIC_200}
            strokeDasharray="8 8"
            strokeOpacity={0.7}
            vertical={false}
          />
          <Bar dataKey={type} fill={COLORS.ACCENT.ANZAC_500} />
          <XAxis
            axisLine={{ stroke: COLORS.NEUTRAL.MYSTIC_200 }}
            dataKey="date"
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
              type === 'tradeVolume' || type === 'protocolFees'
                ? (value) => formatAxisCurrency(value, displayCurrency)
                : formatAxisNumber
            }
            tickLine={false}
          />
          <Tooltip
            content={
              <NetworkMetricsTooltip
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
            stroke={COLORS.NEUTRAL.MYSTIC_300}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
          />
        </BarChart>
      )}
    </BrushableChartContainer>
  );
};

NetworkMetricsChart.propTypes = {
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
  period: PropTypes.string.isRequired,
  type: PropTypes.string,
};

NetworkMetricsChart.defaultProps = {
  type: 'tradeVolume',
};

export default NetworkMetricsChart;
