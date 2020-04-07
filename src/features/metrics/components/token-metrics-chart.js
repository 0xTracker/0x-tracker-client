import _ from 'lodash';
import { Area, AreaChart, XAxis, YAxis, Tooltip, Brush } from 'recharts';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import ChartContainer from '../../../components/chart-container';
import ChartPlaceholder from '../../../components/chart-placeholder';
import formatDate from '../../../util/format-date';
import summarizeCurrency from '../../../util/summarize-currency';
import TokenMetricsTooltip from './token-metrics-tooltip';

const formatAxisDate = (date) => formatDate(date, DATE_FORMAT.COMPACT);

class TokenMetricsChart extends PureComponent {
  constructor() {
    super();

    this.formatValue = this.formatValue.bind(this);
  }

  formatValue(value) {
    if (value === 0) {
      return '';
    }

    const { localCurrency } = this.props;

    return summarizeCurrency(value, localCurrency);
  }

  render() {
    const {
      data,
      localCurrency,
      onBrushChange,
      tokenSymbol,
      type,
    } = this.props;

    if (_.isEmpty(data)) {
      return <ChartPlaceholder>No data available</ChartPlaceholder>;
    }

    return (
      <ChartContainer>
        <AreaChart
          data={data}
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
            tickFormatter={this.formatValue}
            tickLine={false}
          />
          <Tooltip
            content={
              <TokenMetricsTooltip
                localCurrency={localCurrency}
                tokenSymbol={tokenSymbol}
              />
            }
          />
          <Brush
            dataKey="date"
            height={30}
            onChange={onBrushChange}
            stroke={colors.periwinkleGray}
            tickFormatter={formatAxisDate}
          />
        </AreaChart>
      </ChartContainer>
    );
  }
}

TokenMetricsChart.propTypes = {
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
  localCurrency: PropTypes.string.isRequired,
  onBrushChange: PropTypes.func,
  tokenSymbol: PropTypes.string.isRequired,
  type: PropTypes.string,
};

TokenMetricsChart.defaultProps = {
  onBrushChange: undefined,
  type: 'tradeVolume.USD',
};

export default TokenMetricsChart;
