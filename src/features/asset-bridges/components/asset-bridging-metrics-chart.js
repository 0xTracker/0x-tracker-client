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
import ChartContainer from '../../../components/chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const AssetBridgingMetricsChart = React.memo(
  ({ data, granularity, onBrushChange, period, type }) => {
    const displayCurrency = useDisplayCurrency();

    if (_.isEmpty(data)) {
      return <ChartPlaceholder>No data available</ChartPlaceholder>;
    }

    const sanitizedData = data.map((dataPoint) => ({
      ...dataPoint,
      date: dataPoint.date.toISOString(),
    }));

    return (
      <ChartContainer>
        <BarChart
          data={sanitizedData}
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
              <AssetBridgingMetricsTooltip
                currency={displayCurrency}
                granularity={granularity}
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
  },
);

AssetBridgingMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  granularity: PropTypes.string.isRequired,
  onBrushChange: PropTypes.func,
  period: PropTypes.string.isRequired,
  type: PropTypes.string,
};

AssetBridgingMetricsChart.defaultProps = {
  onBrushChange: undefined,
  type: 'tradeVolume',
};

AssetBridgingMetricsChart.displayName = 'AssetBridgingMetricsChart';

export default AssetBridgingMetricsChart;
