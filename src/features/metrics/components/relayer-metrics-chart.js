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
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import ChartContainer from '../../../components/chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';
import formatDate from '../../../util/format-date';
import RelayerMetricsTooltip from './relayer-metrics-tooltip';
import summarizeCurrency from '../../../util/summarize-currency';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const formatAxisDate = (date) => formatDate(date, DATE_FORMAT.COMPACT);

const formatCount = (count) => {
  if (count === 0) {
    return '';
  }

  return numeral(count).format('0,0');
};

const RelayerMetricsChart = React.memo(({ data, onBrushChange, type }) => {
  const displayCurrency = useDisplayCurrency();

  const formatCurrency = (amount) => {
    if (amount === 0) {
      return '';
    }

    return summarizeCurrency(amount, displayCurrency);
  };

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
          stroke={colors.athensGray}
          strokeDasharray="8 8"
          strokeOpacity={0.7}
          vertical={false}
        />
        <Bar dataKey={type} fill={colors.anzac} fillOpacity={0.9} />
        <XAxis
          axisLine={false}
          dataKey="date"
          tick={{ fill: 'currentColor', fontSize: '0.8em' }}
          tickFormatter={formatAxisDate}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          dataKey={type}
          mirror
          tick={{ fill: 'currentColor', fontSize: '0.8em', fontWeight: 'bold' }}
          tickFormatter={type === 'tradeVolume' ? formatCurrency : formatCount}
          tickLine={false}
        />
        <Tooltip content={<RelayerMetricsTooltip />} />
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
});

RelayerMetricsChart.displayName = 'RelayerMetricsChart';

RelayerMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onBrushChange: PropTypes.func,
  type: PropTypes.oneOf(['tradeCount', 'tradeVolume']),
};

RelayerMetricsChart.defaultProps = {
  onBrushChange: undefined,
  type: 'tradeVolume',
};

export default RelayerMetricsChart;
