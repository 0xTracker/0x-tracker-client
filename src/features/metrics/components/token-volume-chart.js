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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import formatDate from '../../../util/format-date';
import padMetrics from '../util/pad-metrics';
import sharedPropTypes from '../../../prop-types';
import summarizeCurrency from '../../../util/summarize-currency';
import TokenVolumeTooltip from './token-volume-tooltip';

const formatAxisDate = date => formatDate(date, DATE_FORMAT.COMPACT);

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

    return summarizeCurrency(value, localCurrency);
  }

  render() {
    const {
      data,
      localCurrency,
      onBrushChange,
      period,
      tokenSymbol,
    } = this.props;

    if (_.isEmpty(data)) {
      return 'No data available';
    }

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
  onBrushChange: PropTypes.func,
  period: sharedPropTypes.timePeriod.isRequired,
  tokenSymbol: PropTypes.string.isRequired,
};

TokenVolumeChart.defaultProps = {
  onBrushChange: undefined,
};

export default TokenVolumeChart;
