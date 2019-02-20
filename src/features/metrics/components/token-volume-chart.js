import _ from 'lodash';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { format as formatDate } from 'date-fns';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { colors } from '../../../styles/constants';
import formatCurrency from '../../../util/format-currency';
import padMetrics from '../util/pad-metrics';
import sharedPropTypes from '../../../prop-types';
import TokenVolumeTooltip from './token-volume-tooltip';

const formatAxisDate = date => formatDate(date, 'MMM DD');

class TokenVolumeChart extends PureComponent {
  constructor() {
    super();

    this.formatValue = this.formatValue.bind(this);
  }

  formatValue(value) {
    if (value === 0) {
      return '';
    }

    const { localCurrency } = this.props;

    return formatCurrency(value, localCurrency, true);
  }

  render() {
    const { data, localCurrency, period, tokenSymbol } = this.props;

    const paddedMetrics = padMetrics(data, period, {
      localizedVolume: 0,
      tokenVolume: '0',
    });

    const sanitizedData = _.map(paddedMetrics, dataPoint => ({
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
            dataKey="localizedVolume"
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
            dataKey="localizedVolume"
            minTickGap={20}
            mirror
            padding={{ top: 25 }}
            tick={{ fill: 'currentColor', fontSize: '0.9em' }}
            tickFormatter={this.formatValue}
            tickLine={false}
          />
          <Tooltip
            content={
              <TokenVolumeTooltip
                localCurrency={localCurrency}
                tokenSymbol={tokenSymbol}
              />
            }
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

TokenVolumeChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.object.isRequired,
      localizedVolume: PropTypes.number.isRequired,
      tokenVolume: PropTypes.string.isRequired,
    }),
  ).isRequired,
  localCurrency: PropTypes.string.isRequired,
  period: sharedPropTypes.timePeriod.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
};

export default TokenVolumeChart;
