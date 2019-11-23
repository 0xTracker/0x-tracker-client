import _ from 'lodash';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import AddressMetricsTooltip from './address-metrics-tooltip';
import formatDate from '../../../util/format-date';
import padMetrics from '../util/pad-metrics';
import sharedPropTypes from '../../../prop-types';
import summarizeCurrency from '../../../util/summarize-currency';

const formatAxisDate = date => formatDate(date, DATE_FORMAT.COMPACT);

class AddressMetricsChart extends PureComponent {
  constructor() {
    super();

    this.formatValue = this.formatValue.bind(this);
  }

  formatValue(value) {
    const { keyMetric, localCurrency } = this.props;

    if (value === 0) {
      return '';
    }

    if (keyMetric === 'fillCount') {
      return value;
    }

    return summarizeCurrency(value, localCurrency);
  }

  render() {
    const { data, keyMetric, localCurrency, period } = this.props;

    if (_.isEmpty(data)) {
      return 'No data available';
    }

    const paddedMetrics = padMetrics(data, period, {
      fillCount: 0,
      fillVolume: 0,
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
            dataKey={keyMetric}
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
            dataKey={keyMetric}
            minTickGap={20}
            mirror
            padding={{ top: 25 }}
            tick={{ fill: 'currentColor', fontSize: '0.9em' }}
            tickFormatter={this.formatValue}
            tickLine={false}
          />
          <Tooltip
            content={<AddressMetricsTooltip localCurrency={localCurrency} />}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

AddressMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.object.isRequired,
      fillVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  keyMetric: PropTypes.string.isRequired,
  localCurrency: PropTypes.string.isRequired,
  period: sharedPropTypes.timePeriod.isRequired,
};

export default AddressMetricsChart;
