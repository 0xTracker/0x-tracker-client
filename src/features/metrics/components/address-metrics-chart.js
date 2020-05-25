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
import AddressMetricsTooltip from './address-metrics-tooltip';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import CardPlaceholder from '../../../components/card-placeholder';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const AddressMetricsChart = ({ data, keyMetric, period, granularity }) => {
  const displayCurrency = useDisplayCurrency();

  if (_.every(data, { [keyMetric]: 0 })) {
    return (
      <CardPlaceholder>
        No data available for the selected period
      </CardPlaceholder>
    );
  }

  return (
    <BrushableChartContainer data={data}>
      {({ brushableData, brushIndexes, handleBrushChange }) => (
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
          <Bar dataKey={keyMetric} fill={COLORS.ACCENT.ANZAC_500} />
          <XAxis
            axisLine={{ stroke: COLORS.NEUTRAL.MYSTIC_200 }}
            dataKey="date"
            tick={{ fill: COLORS.NEUTRAL.MYSTIC_700, fontSize: '0.8em' }}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            dataKey={keyMetric}
            mirror
            scale="linear"
            tick={{
              fill: COLORS.PRIMARY.SCAMPI_800,
              fontSize: '0.8em',
              fontWeight: 500,
            }}
            tickFormatter={
              keyMetric === 'tradeCount'
                ? formatAxisNumber
                : (value) => formatAxisCurrency(value, displayCurrency)
            }
            tickLine={false}
          />
          <Tooltip
            content={
              <AddressMetricsTooltip
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

AddressMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  granularity: PropTypes.string.isRequired,
  keyMetric: PropTypes.string,
  period: PropTypes.string.isRequired,
};

AddressMetricsChart.defaultProps = {
  keyMetric: 'tradeVolume',
};

export default AddressMetricsChart;
