import _ from 'lodash';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { format as formatDate } from 'date-fns';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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

    const { displayCurrency } = this.props;

    return formatCurrency(value, displayCurrency, true);
  }

  render() {
    const { data, displayCurrency, period, token } = this.props;
    const paddedMetrics = padMetrics(data, period, {
      tokenVolume: '0',
      volume: 0,
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
          <CartesianGrid stroke="#f5f5f5" />
          <Area
            animationDuration={0}
            dataKey="volume"
            fill="#99BEBD"
            fillOpacity={1}
            stroke="none"
            type="monotone"
          />
          <XAxis
            axisLine={false}
            dataKey="date"
            minTickGap={60}
            tickFormatter={formatAxisDate}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            dataKey="volume"
            minTickGap={20}
            mirror
            padding={{ top: 25 }}
            tickFormatter={this.formatValue}
            tickLine={false}
          />
          <Tooltip
            content={
              <TokenVolumeTooltip currency={displayCurrency} token={token} />
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
      volume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  displayCurrency: PropTypes.string.isRequired,
  period: sharedPropTypes.timePeriod.isRequired,
  token: PropTypes.string.isRequired,
};

export default TokenVolumeChart;
