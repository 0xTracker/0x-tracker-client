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
import {
  formatAxisCurrency,
  formatAxisDate,
  formatAxisNumber,
} from '../../metrics/util';
import AssetBridgingMetricsTooltip from './asset-bridging-metrics-tooltip';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const AssetBridgingMetricsChart = ({ data, granularity, period, type }) => {
  const displayCurrency = useDisplayCurrency();

  if (_.isEmpty(data)) {
    return <ChartPlaceholder>No data available</ChartPlaceholder>;
  }

  return (
    <BrushableChartContainer data={data}>
      {({ brushableData, brushIndexes, handleBrushChange }) => (
        <BarChart
          data={brushableData}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <CartesianGrid
            stroke={COLORS.NEUTRAL.MYSTIC_300}
            strokeDasharray="8 8"
            strokeOpacity={0.7}
            vertical={false}
          />
          <Bar dataKey={type} fill={COLORS.ACCENT.ANZAC_500} />
          <XAxis
            axisLine={{ stroke: COLORS.NEUTRAL.MYSTIC_300 }}
            dataKey="date"
            tick={{ fill: COLORS.NEUTRAL.MYSTIC_800, fontSize: '0.8em' }}
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
              <AssetBridgingMetricsTooltip
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
        </BarChart>
      )}
    </BrushableChartContainer>
  );
};

AssetBridgingMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  granularity: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  type: PropTypes.string,
};

AssetBridgingMetricsChart.defaultProps = {
  type: 'tradeVolume',
};

export default AssetBridgingMetricsChart;
