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

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import AddressMetricsTooltip from './address-metrics-tooltip';
import ChartContainer from '../../../components/chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';
import formatDate from '../../../util/format-date';
import summarizeNumber from '../../../util/summarize-number';
import summarizeCurrency from '../../../util/summarize-currency';

const formatAxisDate = (date) => formatDate(date, DATE_FORMAT.COMPACT);

const AddressMetricsChart = React.memo(
  ({ data, keyMetric, localCurrency, onBrushChange }) => {
    const formatValue = (value) => {
      if (value === 0) {
        return '';
      }

      if (keyMetric === 'tradeCount') {
        return summarizeNumber(value);
      }

      return summarizeCurrency(value, localCurrency);
    };

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
            stroke={colors.athensGray}
            strokeDasharray="8 8"
            strokeOpacity={0.7}
            vertical={false}
          />
          <Bar dataKey={keyMetric} fill={colors.anzac} fillOpacity={0.9} />
          <XAxis
            axisLine={false}
            dataKey="date"
            tick={{ fill: 'currentColor', fontSize: '0.8em' }}
            tickFormatter={formatAxisDate}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            dataKey={keyMetric}
            mirror
            tick={{
              fill: 'currentColor',
              fontSize: '0.8em',
              fontWeight: 'bold',
            }}
            tickFormatter={formatValue}
            tickLine={false}
          />
          <Tooltip
            content={<AddressMetricsTooltip localCurrency={localCurrency} />}
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
  keyMetric: PropTypes.string,
  localCurrency: PropTypes.string.isRequired,
  onBrushChange: PropTypes.func,
};

AddressMetricsChart.defaultProps = {
  keyMetric: 'tradeVolume',
  onBrushChange: undefined,
};

export default AddressMetricsChart;
