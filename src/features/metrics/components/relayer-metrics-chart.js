import _ from 'lodash';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from 'recharts';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import ChartPlaceholder from '../../../components/chart-placeholder';
import formatDate from '../../../util/format-date';
import padMetrics from '../util/pad-metrics';
import RelayerMetricsTooltip from './relayer-metrics-tooltip';
import sharedPropTypes from '../../../prop-types';
import summarizeCurrency from '../../../util/summarize-currency';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const formatAxisDate = date => formatDate(date, DATE_FORMAT.COMPACT);

const formatCount = count => {
  if (count === 0) {
    return '';
  }

  return numeral(count).format('0,0');
};

const RelayerMetricsChart = React.memo(
  ({ data, onBrushChange, period, type }) => {
    const displayCurrency = useDisplayCurrency();

    const formatCurrency = amount => {
      if (amount === 0) {
        return '';
      }

      return summarizeCurrency(amount, displayCurrency);
    };

    if (_.isEmpty(data)) {
      return <ChartPlaceholder>No data available</ChartPlaceholder>;
    }

    const paddedMetrics = padMetrics(data, period, {
      tradeCount: 0,
      tradeVolume: 0,
    });

    const sanitizedData = paddedMetrics.map(dataPoint => ({
      ...dataPoint,
      date: dataPoint.date.toISOString(),
    }));

    return (
      <ResponsiveContainer>
        <AreaChart
          data={sanitizedData}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <Area
            animationDuration={0}
            dataKey={type}
            fill={colors.periwinkleGray}
            fillOpacity={1}
            stroke={colors.indigo}
            strokeOpacity={0.6}
            strokeWidth={2}
            type="monotone"
          />
          <XAxis
            axisLine={false}
            dataKey="date"
            minTickGap={60}
            tick={{ fill: 'currentColor', fontSize: '0.9em' }}
            tickFormatter={formatAxisDate}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            dataKey={type}
            minTickGap={20}
            mirror
            padding={{ top: 25 }}
            tick={{ fill: 'currentColor', fontSize: '0.9em' }}
            tickFormatter={
              type === 'tradeVolume' ? formatCurrency : formatCount
            }
            tickLine={false}
          />
          <Tooltip content={<RelayerMetricsTooltip />} />
          <Brush
            dataKey="date"
            height={30}
            onChange={onBrushChange}
            stroke={colors.periwinkleGray}
            tickFormatter={formatAxisDate}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  },
);

RelayerMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      fillCount: PropTypes.number.isRequired,
      fillVolume: PropTypes.number.isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onBrushChange: PropTypes.func,
  period: sharedPropTypes.timePeriod.isRequired,
  type: PropTypes.oneOf([
    'fillCount',
    'fillVolume',
    'tradeCount',
    'tradeVolume',
  ]),
};

RelayerMetricsChart.defaultProps = {
  onBrushChange: undefined,
  type: 'tradeVolume',
};

export default RelayerMetricsChart;
