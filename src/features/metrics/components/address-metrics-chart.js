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
import ChartContainer from '../../../components/chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const AddressMetricsChart = React.memo(
  ({ data, keyMetric, onBrushChange, period, granularity }) => {
    const displayCurrency = useDisplayCurrency();

    if (_.isEmpty(data)) {
      return <ChartPlaceholder>No data available</ChartPlaceholder>;
    }

    const sanitizedData = _.map(data, (dataPoint) => ({
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
              fontWeight: 'bold',
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

AddressMetricsChart.displayName = 'AddressMetricsChart';

AddressMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.object.isRequired,
      fillVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  granularity: PropTypes.string.isRequired,
  keyMetric: PropTypes.string,
  onBrushChange: PropTypes.func,
  period: PropTypes.string.isRequired,
};

AddressMetricsChart.defaultProps = {
  keyMetric: 'tradeVolume',
  onBrushChange: undefined,
};

export default AddressMetricsChart;
